import React, { useState, useEffect, useCallback } from 'react';
import { 
  Tag, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  Clock, 
  Gift, 
  Loader2,
  Copy
} from 'lucide-react';
import { PortalLayout } from '../../components/layout/PortalLayout';
import { toast } from 'sonner';
import { voucherAPI } from '../../lib/api';

interface Voucher {
  id: string;
  code: string;
  name: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minPurchase: number;
  maxUsage: number | null;
  usedCount: number;
  platform: 'all' | 'uni_gift_studio' | 'uni_smiles' | 'uni_landfarm' | 'konten_planning';
  isActive: boolean;
  expiredAt: string | null;
  isNew?: boolean;
  isClaimed?: boolean;
}

const PLATFORM_LABELS: Record<string, string> = {
  all: 'Semua Platform',
  uni_gift_studio: 'Uni Gift Studio',
  uni_smiles: 'UniSmiles',
  uni_landfarm: 'UNI-LandFarm',
  konten_planning: 'Konten Planning',
};

const PLATFORM_COLORS: Record<string, string> = {
  all: 'bg-gray-100 text-gray-600',
  uni_gift_studio: 'bg-purple-100 text-purple-700',
  uni_smiles: 'bg-blue-100 text-blue-700',
  uni_landfarm: 'bg-orange-100 text-orange-700',
  konten_planning: 'bg-pink-100 text-pink-700',
};

// ─── Helper: map voucher backend → format UI ──────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapVoucher(v: any): Voucher {
  return {
    id:            String(v.id),
    code:          v.code          ?? '',
    name:          v.title         ?? v.description ?? v.code ?? '',
    discountType:  'percentage',
    discountValue: typeof v.discount === 'number' ? v.discount : parseFloat(v.discount) || 0,
    minPurchase:   0,
    maxUsage:      100,
    usedCount:     v._count?.claims ?? v.totalClaimed ?? v.usedCount ?? 0,
    platform:      'all',
    isActive:      v.isActive ?? true,
    expiredAt:     v.validUntil ?? v.expiredAt ?? null,
    isClaimed:     v.isClaimed  ?? false,
  };
}

export default function PortalVouchers() {
  const [vouchers, setVouchers]     = useState<Voucher[]>([]);
  const [loading, setLoading]       = useState(true);
  const [activeTab, setActiveTab]   = useState<'semua' | 'aktif' | 'terpakai'>('semua');
  const [claimingId, setClaimingId] = useState<string | null>(null);

  // ─── Fetch vouchers dari backend ──────────────────────────────────────────
  const fetchVouchers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await voucherAPI.getAll();
      const raw = response.data?.data ?? response.data ?? [];
      setVouchers(Array.isArray(raw) ? raw.map(mapVoucher) : []);
    } catch (err) {
      console.error('Gagal memuat vouchers:', err);
      toast.error('Gagal memuat data voucher.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVouchers();
  }, [fetchVouchers]);

  // ─── Helpers ──────────────────────────────────────────────────────────────
  const isExpired = (voucher: Voucher): boolean => {
    if (!voucher.expiredAt) return false;
    return new Date(voucher.expiredAt) < new Date();
  };

  const isClaimed = (voucherId: string): boolean => {
    const voucher = vouchers.find(v => v.id === voucherId);
    return voucher?.isClaimed || false;
  };

  const isClaimable = (voucher: Voucher): boolean => {
    if (!voucher.isActive) return false;
    if (isExpired(voucher)) return false;
    if (isClaimed(voucher.id)) return false;
    if (voucher.maxUsage !== null && voucher.usedCount >= voucher.maxUsage) return false;
    return true;
  };

  // ─── Filter berdasarkan tab ────────────────────────────────────────────────
  const filteredVouchers = vouchers.filter(v => {
    if (activeTab === 'aktif')    return isClaimable(v);
    if (activeTab === 'terpakai') return isClaimed(v.id);
    return true;
  });

  // ─── Klaim voucher via API ─────────────────────────────────────────────────
  const handleClaim = async (voucher: Voucher) => {
    if (!isClaimable(voucher)) return;

    setClaimingId(voucher.id);
    try {
      await voucherAPI.claim(voucher.id);

      // Refresh daftar voucher agar status isClaimed terupdate
      const response = await voucherAPI.getAll();
      const raw = response.data?.data ?? response.data ?? [];
      setVouchers(Array.isArray(raw) ? raw.map(mapVoucher) : []);

      toast.success(`Voucher ${voucher.code} berhasil diklaim!`, {
        description: `Siap digunakan di ${PLATFORM_LABELS[voucher.platform]}.`,
        duration: 4000,
      });
    } catch (err: any) {
      const message = err?.response?.data?.message ?? 'Gagal mengklaim voucher. Coba lagi.';
      toast.error(message);
    } finally {
      setClaimingId(null);
    }
  };

  const formatDate = (dateStr: string): string =>
    new Date(dateStr).toLocaleDateString('id-ID', {
      day: 'numeric', month: 'long', year: 'numeric'
    });

  // ─── Loading state ─────────────────────────────────────────────────────────
  if (loading) {
    return (
      <PortalLayout>
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-[#F59E0B] border-t-transparent rounded-full animate-spin" />
        </div>
      </PortalLayout>
    );
  }

  return (
    <PortalLayout>
      <div className="w-full px-4 sm:px-6 py-6 max-w-5xl mx-auto animate-fade-in">
        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-[28px] font-bold text-[#1A1A1A] tracking-tight leading-tight">
            Voucher &amp; Promo
          </h1>
          <p className="text-xs md:text-[14px] text-gray-500 mt-1">
            Klaim voucher eksklusif untuk layanan Uni Inside Media.
          </p>
        </div>

        {/* TAB FILTER */}
        <div className="flex gap-1 mb-6 bg-gray-100 p-1 rounded-xl w-fit max-w-full overflow-x-auto">
          {(['semua', 'aktif', 'terpakai'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg text-xs sm:text-[13px] font-medium transition-all capitalize cursor-pointer border-none whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-[#1A1A1A] text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-700 bg-transparent'
              }`}
            >
              {tab === 'semua' ? 'Semua' : tab === 'aktif' ? 'Aktif' : 'Sudah Diklaim'}
            </button>
          ))}
        </div>

        {/* GRID VOUCHER */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredVouchers.map(voucher => {
            const claimed   = isClaimed(voucher.id);
            const expired   = isExpired(voucher);
            const claimable = isClaimable(voucher);
            const isLoading = claimingId === voucher.id;

            return (
              <div
                key={voucher.id}
                className={`bg-white rounded-2xl border overflow-hidden transition-all ${
                  claimed
                    ? 'border-gray-200 opacity-75'
                    : expired
                    ? 'border-gray-200 opacity-60'
                    : 'border-[#F59E0B]/30 hover:border-[#F59E0B] hover:shadow-md'
                }`}
              >
                {/* SECTION ATAS — Warna kuning */}
                <div className="bg-[#FEF9E7] px-5 pt-5 pb-4 relative">
                  {voucher.isNew && !claimed && !expired && (
                    <span className="absolute top-4 left-5 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                      BARU
                    </span>
                  )}

                  <Tag className={`absolute top-4 right-5 w-5 h-5 ${
                    claimed || expired ? 'text-gray-300' : 'text-[#F59E0B]'
                  }`} />

                  <div className="mt-2">
                    {voucher.discountType === 'percentage' ? (
                      <div className="flex items-baseline gap-1">
                        <span className="text-[36px] font-black text-[#1A1A1A]">
                          {voucher.discountValue}
                        </span>
                        <span className="text-[16px] font-bold text-[#1A1A1A]">% OFF</span>
                      </div>
                    ) : (
                      <span className="text-[32px] font-black text-[#1A1A1A]">
                        Rp {voucher.discountValue.toLocaleString('id-ID')}
                      </span>
                    )}
                    <p className="text-[13px] text-[#F59E0B] font-medium mt-0.5">Diskon</p>
                  </div>
                </div>

                {/* SECTION BAWAH — Putih */}
                <div className="px-5 py-4">
                  {/* INFO ROW */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block mb-1">
                        PLATFORM
                      </span>
                      <span className={`text-[12px] font-medium px-2 py-0.5 rounded-full ${PLATFORM_COLORS[voucher.platform]}`}>
                        {PLATFORM_LABELS[voucher.platform]}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block mb-1">
                        MIN. PEMBELIAN
                      </span>
                      <span className="text-[13px] font-semibold text-[#1A1A1A]">
                        Rp {voucher.minPurchase.toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>

                  {/* KODE KUPON (hanya tampil jika sudah diklaim) */}
                  {claimed && (
                    <div className="mt-3 mb-2">
                      <p className="text-[10px] font-bold text-gray-400 uppercase mb-1.5">Kode Kupon</p>
                      <div className="flex items-center gap-2 bg-white border border-dashed border-[#F59E0B] rounded-xl px-3 py-2">
                        <span className="font-mono font-bold text-[15px] text-[#1A1A1A] flex-1 tracking-widest">
                          {voucher.code}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigator.clipboard.writeText(voucher.code);
                            toast.success(`Kode ${voucher.code} berhasil disalin!`);
                          }}
                          className="p-1.5 rounded-lg hover:bg-amber-50 transition-colors"
                          title="Salin kode"
                        >
                          <Copy className="w-4 h-4 text-[#F59E0B]" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* TOMBOL KLAIM / STATUS */}
                  {claimed ? (
                    <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl px-4 py-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <div>
                          <span className="text-[13px] font-bold text-green-700 block">
                            Sudah Diklaim
                          </span>
                          <span className="text-[11px] text-green-500">
                            Voucher ada di akun Anda
                          </span>
                        </div>
                      </div>
                      <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${PLATFORM_COLORS[voucher.platform]}`}>
                        {PLATFORM_LABELS[voucher.platform]}
                      </span>
                    </div>
                  ) : expired ? (
                    <div className="flex items-center justify-center gap-2 bg-gray-100 rounded-xl px-4 py-3">
                      <XCircle className="w-4 h-4 text-gray-400" />
                      <span className="text-[13px] text-gray-400 font-medium">
                        Voucher Kedaluwarsa
                      </span>
                    </div>
                  ) : claimable ? (
                    <button
                      onClick={() => handleClaim(voucher)}
                      disabled={isLoading}
                      className="w-full flex items-center justify-center gap-2 bg-[#1A1A1A] hover:bg-[#2A2A2A] disabled:opacity-70 text-white font-bold text-[14px] rounded-xl py-3 transition-all active:scale-[0.98] cursor-pointer"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-[#F59E0B]" />
                          <span>Mengklaim...</span>
                        </>
                      ) : (
                        <>
                          <Gift className="w-4 h-4 text-[#F59E0B]" />
                          <span>Klaim Voucher</span>
                        </>
                      )}
                    </button>
                  ) : (
                    <div className="flex items-center justify-center gap-2 bg-gray-100 rounded-xl px-4 py-3">
                      <AlertCircle className="w-4 h-4 text-gray-400" />
                      <span className="text-[13px] text-gray-400 font-medium">
                        Kuota Habis
                      </span>
                    </div>
                  )}

                  {/* EXPIRED DATE */}
                  {voucher.expiredAt && (
                    <div className="flex items-center gap-1.5 mt-3">
                      {expired ? (
                        <>
                          <Clock className="w-3.5 h-3.5 text-red-400" />
                          <span className="text-[12px] text-red-400">
                            Kedaluwarsa: {formatDate(voucher.expiredAt)}
                          </span>
                        </>
                      ) : (
                        <>
                          <Clock className="w-3.5 h-3.5 text-gray-400" />
                          <span className="text-[12px] text-gray-400">
                            Berlaku hingga {formatDate(voucher.expiredAt)}
                          </span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {filteredVouchers.length === 0 && (
            <div className="col-span-1 md:col-span-2 text-center py-16">
              <Tag className="w-12 h-12 text-gray-200 mx-auto mb-4" />
              <p className="text-[15px] font-medium text-gray-400">
                Tidak ada voucher
              </p>
              <p className="text-[13px] text-gray-300 mt-1">
                {activeTab === 'aktif'
                  ? 'Belum ada voucher aktif yang dapat diklaim saat ini.'
                  : activeTab === 'terpakai'
                  ? 'Anda belum mengklaim voucher apapun.'
                  : 'Tidak ada voucher tersedia saat ini.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </PortalLayout>
  );
}
