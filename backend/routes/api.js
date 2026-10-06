import express from 'express';
const router = express.Router();

// Mock / Hybrid Controllers for Express Endpoints
router.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'E-WasteX Express REST API is running', timestamp: new Date() });
});

// Auth Routes (Requirement #26)
router.post('/auth/register', (req, res) => {
  const { name, email, role } = req.body;
  res.json({
    user: {
      id: `user-${Date.now()}`,
      name: name || 'Demo User',
      email,
      role: role || 'USER',
      points: 150,
      totalRecycledKg: 0,
      totalItemsRecycled: 0,
      co2SavedKg: 0,
      createdAt: new Date().toISOString(),
    },
    token: `jwt_token_${Date.now()}`,
  });
});

router.post('/auth/login', (req, res) => {
  const { email } = req.body;
  res.json({
    user: {
      id: `user-${Date.now()}`,
      name: email ? email.split('@')[0] : 'Demo User',
      email,
      role: email && email.includes('admin') ? 'ADMIN' : email && email.includes('collector') ? 'COLLECTOR' : email && email.includes('recycler') ? 'RECYCLER' : 'USER',
      points: 1200,
      totalRecycledKg: 18.5,
      totalItemsRecycled: 6,
      co2SavedKg: 27.7,
      createdAt: new Date().toISOString(),
    },
    token: `jwt_token_${Date.now()}`,
  });
});

// E-Waste Routes
router.get('/ewaste', (req, res) => {
  res.json({ success: true, count: 5 });
});

router.post('/ewaste', (req, res) => {
  const trackingId = `EW-2026-${Math.floor(100000 + Math.random() * 900000)}`;
  res.status(201).json({ success: true, trackingId, item: { ...req.body, trackingId } });
});

router.get('/ewaste/:id', (req, res) => {
  res.json({ success: true, trackingId: req.params.id, status: 'RECYCLED' });
});

// Pickup Routes
router.get('/pickups', (req, res) => {
  res.json({ success: true, count: 2 });
});

router.post('/pickups', (req, res) => {
  const pickupId = `PU-2026-${Math.floor(100000 + Math.random() * 900000)}`;
  res.status(201).json({ success: true, pickupId, pickup: { ...req.body, pickupId } });
});

router.patch('/pickups/:id/status', (req, res) => {
  res.json({ success: true, pickupId: req.params.id, status: req.body.status });
});

// AI Scanning Endpoint (Requirement #26)
router.post('/scan', (req, res) => {
  res.json({
    detectedDevice: 'High-End Gaming Laptop',
    confidence: 96,
    category: 'Computer Equipment',
    condition: 'Minor Damage',
    hazardLevel: 'Medium',
    estimatedWeightRange: '1.8 – 2.5 KG',
    recyclability: 'High',
    recommendedAction: 'Send to authorized e-waste recycler.',
    suggestedValueINR: 2600,
    suggestedPoints: 650,
  });
});

// Rewards & Admin Analytics
router.post('/rewards/redeem', (req, res) => {
  res.json({ success: true, voucherCode: `EV-${Math.floor(100000 + Math.random() * 900000)}` });
});

router.get('/admin/analytics', (req, res) => {
  res.json({
    totalUsers: 2580,
    totalEwaste: 5420,
    totalKgRecycled: 10450.8,
    recyclingRate: 96.8,
  });
});

export default router;
