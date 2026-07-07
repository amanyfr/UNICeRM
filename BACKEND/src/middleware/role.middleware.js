/**
 * Middleware untuk membatasi akses berdasarkan role.
 * Penggunaan: requireRole('ADMIN') atau requireRole('ADMIN', 'AGENT')
 * Mendukung role uppercase (dari DB) maupun lowercase (dari token)
 */
const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ status: 'error', message: 'Tidak terautentikasi' });
    }

    // Normalisasi: bandingkan uppercase keduanya
    const userRole   = req.user.role?.toUpperCase();
    const allowedRoles = roles.map(r => r.toUpperCase());

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        status:  'error',
        message: `Akses ditolak. Role '${req.user.role}' tidak diizinkan.`,
      });
    }

    next();
  };
};

module.exports = requireRole;
