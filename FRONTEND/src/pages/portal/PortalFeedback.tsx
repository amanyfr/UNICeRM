'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { 
  Star, 
  CheckCircle2, 
  Send, 
  Loader2 
} from 'lucide-react';
import { PortalLayout } from '../../components/layout/PortalLayout';
import { toast } from 'sonner';
import { ticketAPI, feedbackAPI } from '../../lib/api';

export default function PortalFeedback() {
  // Form state
  const [selectedTicket, setSelectedTicket] = useState('');
  const [rating, setRating]                 = useState(0);
  const [hoverRating, setHoverRating]       = useState(0);
  const [comment, setComment]               = useState('');
  const [isSubmitting, setIsSubmitting]     = useState(false);
  const [submitted, setSubmitted]           = useState(false);

  // Data state
  const [resolvedTickets, setResolvedTickets]   = useState<any[]>([]);
  const [feedbackHistory, setFeedbackHistory]   = useState<any[]>([]);
  const [loading, setLoading]                   = useState(true);

  const LABELS = ['', 'Sangat Buruk', 'Buruk', 'Cukup', 'Bagus', 'Sangat Bagus!'];

  // ─── Fetch tiket resolved + riwayat feedback customer ───────────────────
  const fetchMyFeedbacks = useCallback(async () => {
    try {
      const res = await feedbackAPI.getMyFeedbacks();
      const raw = res.data?.data ?? res.data ?? [];
      setFeedbackHistory(
        (Array.isArray(raw) ? raw : []).map((fb: any) => ({
          ticketId: fb.ticketNumber ?? fb.ticketId ?? '-',
          title:    fb.title        ?? fb.ticket?.title ?? '',
          rating:   fb.rating,
          comment:  fb.comment      ?? '',
          date:     fb.createdAt
            ? new Date(fb.createdAt).toLocaleDateString('id-ID', {
                day: 'numeric', month: 'long', year: 'numeric'
              })
            : '-',
        }))
      );
    } catch (err) {
      console.error('Gagal memuat riwayat feedback:', err);
    }
  }, []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [ticketRes, feedbackRes] = await Promise.all([
        ticketAPI.getAll(),
        feedbackAPI.getMyFeedbacks(),
      ]);

      // Tiket resolved
      const raw = ticketRes.data?.data ?? ticketRes.data ?? [];
      const resolved = (Array.isArray(raw) ? raw : [])
        .filter((t: any) => {
          const s = t.status?.toLowerCase();
          return s === 'resolved' || s === 'closed';
        })
        .map((t: any) => ({
          id:           String(t.id),
          ticketNumber: t.ticketNumber ?? `TKT-${String(t.id).padStart(3, '0')}`,
          title:        t.title ?? '',
        }));
      setResolvedTickets(resolved);

      // Riwayat feedback dari backend
      const fbRaw = feedbackRes.data?.data ?? feedbackRes.data ?? [];
      setFeedbackHistory(
        (Array.isArray(fbRaw) ? fbRaw : []).map((fb: any) => ({
          ticketId: fb.ticketNumber ?? fb.ticketId ?? '-',
          title:    fb.title        ?? fb.ticket?.title ?? '',
          rating:   fb.rating,
          comment:  fb.comment      ?? '',
          date:     fb.createdAt
            ? new Date(fb.createdAt).toLocaleDateString('id-ID', {
                day: 'numeric', month: 'long', year: 'numeric'
              })
            : '-',
        }))
      );
    } catch (err) {
      console.error('Gagal memuat data:', err);
      toast.error('Gagal memuat data tiket.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ─── Submit feedback ke backend ──────────────────────────────────────────
  const handleSubmitFeedback = async () => {
    if (!selectedTicket || !rating) return;

    setIsSubmitting(true);
    try {
      await feedbackAPI.create({
        ticketId: parseInt(selectedTicket),
        rating,
        comment,
      });

      // Refresh riwayat feedback dari database
      await fetchMyFeedbacks();

      // Hapus tiket dari dropdown agar tidak bisa difeedback lagi
      setResolvedTickets(prev => prev.filter(t => String(t.id) !== selectedTicket));

      setSubmitted(true);
      toast.success('Terima kasih! Feedback Anda sangat berarti.');

      setTimeout(() => {
        setRating(0);
        setComment('');
        setSelectedTicket('');
        setSubmitted(false);
      }, 3000);
    } catch (err: any) {
      const status = err?.response?.status;
      if (status === 409) {
        toast.error('Kamu sudah memberi feedback untuk tiket ini.');
      } else if (status === 400) {
        toast.error('Tiket belum selesai atau tidak ditemukan.');
      } else {
        toast.error('Gagal mengirim feedback. Coba lagi.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─── Loading state ────────────────────────────────────────────────────────
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
      <div className="min-h-[calc(100vh-56px)] p-4 sm:p-6 md:p-8">
        <div className="max-w-4xl mx-auto space-y-6">

          {/* HEADER */}
          <div>
            <h1 className="text-2xl md:text-[28px] font-bold text-[#1A1A1A] tracking-tight leading-tight">
              Feedback &amp; Rating
            </h1>
            <p className="text-xs md:text-[14px] text-gray-500 mt-1">
              Bantu kami meningkatkan layanan dengan feedback Anda.
            </p>
          </div>

          {/* SECTION — Beri Rating */}
          <div className="bg-white/75 backdrop-blur-xl border border-white/60 shadow-[0_4px_24px_rgba(0,0,0,0.07),inset_0_1px_0_rgba(255,255,255,0.9)] rounded-[22px] p-5 sm:p-6 md:p-8 mb-6">
            {submitted ? (
              /* SUCCESS STATE — setelah submit */
              <div className="text-center py-8 select-none animate-fade-in">
                <div className="w-[72px] h-[72px] rounded-2xl bg-green-50/80 backdrop-blur-sm border border-green-200 flex items-center justify-center mx-auto mb-4 shadow-[0_4px_12px_rgba(34,197,94,0.15)]">
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-[20px] font-bold text-[#1A1A1A]">
                  Feedback Terkirim!
                </h3>
                <p className="text-[14px] text-gray-500 mt-2">
                  Terima kasih telah membantu kami berkembang.
                </p>
              </div>
            ) : resolvedTickets.length === 0 && feedbackHistory.length > 0 ? (
              /* SEMUA TIKET SUDAH DIFEEDBACK */
              <div className="text-center py-10 select-none">
                <div className="w-[72px] h-[72px] rounded-2xl bg-green-50/80 backdrop-blur-sm border border-green-200 flex items-center justify-center mx-auto mb-4 shadow-[0_4px_12px_rgba(34,197,94,0.15)]">
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-[20px] font-bold text-[#1A1A1A]">
                  Semua Feedback Sudah Diberikan!
                </h3>
                <p className="text-[14px] text-gray-500 mt-2 max-w-sm mx-auto">
                  Terima kasih telah memberikan feedback untuk semua tiket layanan Anda. Penilaian Anda sangat membantu kami berkembang.
                </p>
              </div>
            ) : resolvedTickets.length === 0 && feedbackHistory.length === 0 ? (
              /* BELUM ADA TIKET SELESAI */
              <div className="text-center py-10 select-none">
                <div className="w-[72px] h-[72px] rounded-2xl bg-gray-50/80 backdrop-blur-sm border border-gray-200 flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-gray-300" />
                </div>
                <h3 className="text-[20px] font-bold text-[#1A1A1A]">
                  Belum Ada Tiket Selesai
                </h3>
                <p className="text-[14px] text-gray-500 mt-2 max-w-sm mx-auto">
                  Belum ada tiket yang selesai. Feedback dapat diberikan setelah tiket layanan Anda diselesaikan oleh tim CS.
                </p>
              </div>
            ) : (
              /* FEEDBACK FORM */
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg md:text-[20px] font-bold text-[#1A1A1A] mb-1">
                    Beri Rating Layanan
                  </h2>
                  <p className="text-xs md:text-[14px] text-gray-500">
                    Pilih tiket yang ingin diberi feedback:
                  </p>
                </div>

                {/* SELECT TIKET */}
                <select
                  value={selectedTicket}
                  onChange={e => setSelectedTicket(e.target.value)}
                  className="w-full h-[48px] bg-white/40 backdrop-blur-md border border-white/60 shadow-[0_2px_8px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.9)] rounded-xl px-3 text-xs md:text-[14px] text-[#1A1A1A] outline-none focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/20 transition-all font-semibold"
                >
                  <option value="">Pilih tiket untuk diberi feedback...</option>
                  {resolvedTickets.length === 0 ? (
                    <option value="" disabled>Semua tiket sudah diberi feedback ✓</option>
                  ) : (
                    resolvedTickets.map(t => (
                      <option key={t.id} value={t.id}>
                        {t.ticketNumber} — {t.title}
                      </option>
                    ))
                  )}
                </select>

                {resolvedTickets.length === 0 && feedbackHistory.length === 0 && (
                  <p className="text-[13px] text-gray-400 text-center py-2">
                    Belum ada tiket selesai yang bisa diberi feedback.
                  </p>
                )}

                {/* BINTANG RATING INTERAKTIF */}
                <div className="flex flex-col items-center justify-center py-3 select-none">
                  <div className="flex items-center gap-1.5 sm:gap-3 bg-white/50 backdrop-blur-md px-4 sm:px-6 py-3.5 sm:py-4 border border-white/60 rounded-[20px] shadow-[0_4px_16px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.8)]">
                    {[1, 2, 3, 4, 5].map(star => {
                      const isActive = (hoverRating || rating) >= star;
                      return (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setRating(star)}
                          className="transition-transform hover:scale-110 duration-150 cursor-pointer p-0.5 sm:p-1 group"
                        >
                          <Star
                            className={`w-7 h-7 sm:w-10 sm:h-10 transition-colors ${
                              isActive
                                ? 'text-[#F59E0B] fill-[#F59E0B] group-hover:drop-shadow-[0_4px_8px_rgba(245,158,11,0.4)]'
                                : 'text-gray-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.05)]'
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>

                  {/* Rating Label */}
                  <div className="text-center h-6 mt-4">
                    {rating > 0 && (
                      <span className={`text-[15px] sm:text-[16px] font-semibold ${
                        rating <= 2
                          ? 'text-red-500'
                          : rating === 3
                          ? 'text-[#F59E0B]'
                          : 'text-green-600'
                      }`}>
                        {LABELS[rating]}
                      </span>
                    )}
                  </div>
                </div>

                {/* TEXTAREA KOMENTAR */}
                <div>
                  <textarea
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    rows={4}
                    placeholder="Ceritakan pengalaman Anda (opsional)..."
                    className="w-full bg-white/40 backdrop-blur-md border border-white/60 shadow-[0_2px_8px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.9)] rounded-xl px-4 py-3 text-xs md:text-[14px] text-[#1A1A1A] resize-none outline-none focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/20 placeholder-gray-400 transition-all font-medium"
                  />
                </div>

                {/* TOMBOL KIRIM */}
                <button
                  type="button"
                  disabled={!selectedTicket || !rating || isSubmitting}
                  onClick={handleSubmitFeedback}
                  className="w-full h-[52px] bg-[#F59E0B]/90 backdrop-blur-md border border-[#F59E0B]/50 hover:bg-[#F59E0B] shadow-[0_4px_16px_rgba(245,158,11,0.3),inset_0_2px_0_rgba(255,255,255,0.2)] disabled:opacity-40 disabled:cursor-not-allowed text-[#1A1A1A] font-bold text-sm md:text-[15px] rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer select-none active:scale-[0.98]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#1A1A1A]" />
                      <span className="text-[#1A1A1A]">Mengirim...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-[#1A1A1A]" />
                      <span className="text-[#1A1A1A]">Kirim Feedback</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* RIWAYAT FEEDBACK */}
          <div className="bg-white/75 backdrop-blur-xl border border-white/60 shadow-[0_4px_24px_rgba(0,0,0,0.07),inset_0_1px_0_rgba(255,255,255,0.9)] rounded-[22px] p-6">
            <h2 className="text-[16px] font-bold text-[#1A1A1A] mb-4">
              Riwayat Feedback Anda
            </h2>

            {feedbackHistory.length === 0 ? (
              <div className="text-center py-8 text-gray-400 text-[13px]">
                Belum ada riwayat feedback
              </div>
            ) : (
              <div className="space-y-3">
                {feedbackHistory.map((fb: any, idx: number) => (
                  <div
                    key={idx}
                    className="bg-white/60 backdrop-blur-sm border border-white/80 shadow-[0_2px_8px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.9)] rounded-[16px] p-4 flex flex-col justify-between hover:bg-white/80 transition-colors"
                  >
                    <div className="flex items-start justify-between flex-wrap gap-2">
                      <div>
                        <span className="font-mono text-[12px] text-gray-400 font-bold">
                          {fb.ticketId}
                        </span>
                        <p className="font-bold text-[14px] text-[#1A1A1A] mt-0.5">
                          {fb.title}
                        </p>
                      </div>
                      <div className="flex items-center gap-0.5 select-none bg-white/40 border border-white/60 px-2 py-1 rounded-[10px] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
                        {[1, 2, 3, 4, 5].map(i => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i <= fb.rating
                                ? 'text-[#F59E0B] fill-[#F59E0B]'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    {fb.comment && (
                      <p className="text-[13px] text-gray-500 mt-3 italic font-medium leading-relaxed bg-white/30 p-2.5 rounded-[10px] border border-white/40 shadow-inner">
                        "{fb.comment}"
                      </p>
                    )}
                    <span className="text-[11px] text-gray-400 mt-3 block font-semibold select-none">
                      {fb.date}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </PortalLayout>
  );
}
