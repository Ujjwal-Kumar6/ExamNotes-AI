import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setAmount } from '../redux/amountSlice';
import { useDispatch } from 'react-redux';
import { url } from '../App';
import axios from 'axios';
import { setUserData } from '../redux/userSlice';

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,600;0,9..144,700&family=Outfit:wght@300;400;500;600;700&display=swap');

  .price-page {
    min-height: 100vh;
    background: radial-gradient(ellipse at 60% 0%, #1e1a4a 0%, #0f0e2a 50%, #0a0a1a 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 20px;
    font-family: 'Outfit', sans-serif;
    position: relative;
    overflow: hidden;
  }

  .price-page::before {
    content: '';
    position: absolute;
    width: 600px; height: 600px;
    background: radial-gradient(circle, rgba(120, 80, 255, 0.12) 0%, transparent 70%);
    top: -100px; right: -100px;
    pointer-events: none;
  }

  .price-page::after {
    content: '';
    position: absolute;
    width: 400px; height: 400px;
    background: radial-gradient(circle, rgba(200, 80, 255, 0.08) 0%, transparent 70%);
    bottom: -80px; left: -80px;
    pointer-events: none;
  }

  .price-back-btn {
    position: absolute;
    top: 24px;
    left: 24px;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 9px 18px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 10px;
    color: #9896a8;
    font-size: 13px;
    font-weight: 500;
    font-family: 'Outfit', sans-serif;
    cursor: pointer;
    transition: all 0.2s;
    z-index: 10;
    animation: priceUp 0.4s ease both;
  }

  .price-back-btn:hover {
    background: rgba(167,139,250,0.1);
    border-color: rgba(167,139,250,0.3);
    color: #a78bfa;
    transform: translateX(-3px);
  }

  .price-back-btn:active {
    transform: translateX(-1px) scale(0.98);
  }

  .price-back-arrow {
    font-size: 16px;
    line-height: 1;
    transition: transform 0.2s;
  }

  .price-back-btn:hover .price-back-arrow {
    transform: translateX(-2px);
  }

  .price-heading {
    font-family: 'Fraunces', serif;
    font-size: 42px;
    font-weight: 700;
    color: #c084fc;
    margin-bottom: 10px;
    text-align: center;
    letter-spacing: -0.02em;
    animation: priceUp 0.5s ease both;
  }

  .price-heading span {
    display: inline-block;
    margin-left: 10px;
    animation: float 3s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-6px); }
  }

  .price-sub {
    font-size: 13px;
    color: #7c7a9a;
    margin-bottom: 48px;
    text-align: center;
    animation: priceUp 0.5s 0.1s ease both;
    opacity: 0;
    animation-fill-mode: forwards;
  }

  .price-sub strong {
    color: #a78bfa;
    font-weight: 600;
  }

  .price-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    width: 100%;
    max-width: 980px;
    position: relative;
    z-index: 1;
  }

  .price-card {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 18px;
    padding: 36px 28px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
    transition: transform 0.25s, border-color 0.25s, box-shadow 0.25s;
    animation: priceUp 0.5s ease both;
    opacity: 0;
    animation-fill-mode: forwards;
    position: relative;
  }

  .price-card:nth-child(1) { animation-delay: 0.15s; }
  .price-card:nth-child(2) { animation-delay: 0.25s; }
  .price-card:nth-child(3) { animation-delay: 0.35s; }

  .price-card:hover {
    transform: translateY(-6px);
    border-color: rgba(167,139,250,0.3);
    box-shadow: 0 20px 60px rgba(120,80,255,0.15);
  }

  .price-card.featured {
    border-color: rgba(167,139,250,0.45);
    background: rgba(120,80,255,0.08);
    box-shadow: 0 0 0 1px rgba(167,139,250,0.2), 0 20px 60px rgba(120,80,255,0.2);
  }

  .price-badge {
    position: absolute;
    top: -14px;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(135deg, #7c3aed, #a855f7);
    color: #fff;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    padding: 5px 16px;
    border-radius: 99px;
    white-space: nowrap;
    font-family: 'Outfit', sans-serif;
  }

  .price-plan-name {
    font-size: 20px;
    font-weight: 600;
    color: #e8e6f0;
    margin-bottom: 18px;
    letter-spacing: -0.01em;
  }

  .price-diamond-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 10px;
  }

  .price-diamond-icon {
    font-size: 28px;
    filter: drop-shadow(0 0 8px rgba(100,160,255,0.6));
  }

  .price-amount {
    font-family: 'Fraunces', serif;
    font-size: 42px;
    font-weight: 700;
    color: #e8e6f0;
    letter-spacing: -0.03em;
    line-height: 1;
  }

  .price-card.featured .price-amount {
    font-size: 52px;
  }

  .price-inr {
    font-size: 22px;
    font-weight: 700;
    color: #a78bfa;
    margin-bottom: 24px;
    letter-spacing: -0.01em;
  }

  .price-card.featured .price-inr {
    font-size: 26px;
  }

  .price-btn {
    width: 100%;
    padding: 14px;
    border-radius: 12px;
    border: none;
    background: linear-gradient(135deg, #6d28d9, #7c3aed);
    color: #fff;
    font-size: 15px;
    font-weight: 600;
    font-family: 'Outfit', sans-serif;
    cursor: pointer;
    transition: all 0.2s;
    letter-spacing: 0.01em;
    margin-top: auto;
  }

  .price-btn:hover {
    background: linear-gradient(135deg, #7c3aed, #9333ea);
    transform: scale(1.02);
    box-shadow: 0 8px 24px rgba(120,80,255,0.4);
  }

  .price-btn:active {
    transform: scale(0.98);
  }

  .price-footer {
    margin-top: 32px;
    font-size: 12px;
    color: #4a4870;
    text-align: center;
    animation: priceUp 0.5s 0.5s ease both;
    opacity: 0;
    animation-fill-mode: forwards;
  }

  @keyframes priceUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 768px) {
    .price-grid {
      grid-template-columns: 1fr;
      max-width: 360px;
    }
    .price-heading { font-size: 30px; }
    .price-back-btn { top: 16px; left: 16px; padding: 8px 14px; }
  }
`;

const PLANS = [
  { name: 'Basic',   diamonds: 100,  price: '₹50',  amount: 50,  featured: false },
  { name: 'Pro',     diamonds: 300,  price: '₹99',  amount: 99,  featured: true, badge: 'Most Popular' },
  { name: 'Premium', diamonds: 1000, price: '₹249', amount: 249, featured: false },
];

const MAX_DIAMONDS = (2147483647).toLocaleString('en-IN');

function Price() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const id = 'price-styles-v1';
    if (!document.getElementById(id)) {
      const el = document.createElement('style');
      el.id = id;
      el.textContent = STYLES;
      document.head.appendChild(el);
    }
  }, []);

  const handleBuy = async (plan) => {
    try {
      const res = await axios.post(`${url}/topup/topup`, {
        amount: plan.amount,
      }, {
        withCredentials: true,
      });
      window.location.href = res.data.url;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="price-page">

      <button className="price-back-btn" onClick={() => navigate(-1)}>
        <span className="price-back-arrow">←</span>
        <span>Back</span>
      </button>

      <h1 className="price-heading">
        Top-Up Diamonds <span>💎</span>
      </h1>
      <p className="price-sub">
        *Maximum diamond balance: <strong>{MAX_DIAMONDS}</strong> (INT-32 limit)
      </p>

      <div className="price-grid">
        {PLANS.map((plan) => (
          <div key={plan.name} className={`price-card${plan.featured ? ' featured' : ''}`}>
            {plan.badge && <div className="price-badge">{plan.badge}</div>}

            <div className="price-plan-name">{plan.name}</div>

            <div className="price-diamond-row">
              <span className="price-diamond-icon">💎</span>
              <span className="price-amount">{plan.diamonds.toLocaleString()}</span>
            </div>

            <div className="price-inr">{plan.price}</div>

            <button className="price-btn" onClick={() => handleBuy(plan)}>
              Buy Now
            </button>
          </div>
        ))}
      </div>

      <p className="price-footer">Diamonds cannot exceed INT-32 storage limit.</p>
    </div>
  );
}

export default Price;