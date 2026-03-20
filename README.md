# AI-Powered Parametric Insurance for Gig Workers (Swiggy/Zomato)

When deliveries stop, income stops instantly.  
Our system ensures payouts start just as fast.

---

## 1. Problem Statement

Food delivery partners (Swiggy/Zomato and similar platforms) rely on daily earnings to cover rent, EMI, and family needs. However, external disruptions can abruptly reduce order volumes or prevent deliveries altogether, leading to immediate income loss.

In many Indian cities, disrupted days can cut delivery partner earnings by **~20–30%**. For a typical delivery week where a delivery partner may earn **₹3,000–₹5,000**, a single heavy-rain or AQI spike window can erase **₹500–₹1,200**—with no predictable recovery.

Common disruption drivers:
- Heavy rain / flooding: reduced delivery demand and higher route cancellations
- Extreme heat: safety restrictions + delivery partner health constraints + demand drop
- High pollution (AQI spikes): health advisories and operational slowdowns
- Curfews / localized restrictions: sudden downtime without predictable notice

Unlike traditional insurance, most schemes are slow, documentation-heavy, and mismatch the real-time nature of gig delivery work—leaving delivery partners exposed during the exact periods they need support.

---

## 2. Solution Overview

We propose an **AI-powered parametric insurance platform** designed specifically for gig delivery partners.

Core concepts:
- Automated triggers: Real-world environmental thresholds (rainfall, AQI, heat index) activate payouts without lengthy paperwork.
- Instant payouts: Once triggers are met and verified, claims are processed with minimal friction.
- Zero-touch claims (no manual filing required)
- Weekly pricing model: Premiums align with gig earnings—**small, adaptive weekly costs** instead of large upfront commitments.

What makes it practical:
- Fast response window (hours/days, not months)
- Clear eligibility rules based on measurable parameters
- AI-assisted anti-fraud to protect genuine delivery partners and keep payouts sustainable

Real payout example:
A delivery partner earning ₹800/day loses 2 days due to heavy rain → ₹1,600 loss. Our system automatically triggers a payout (₹400–₹600) within minutes.

---

## 2.1. Predictive Protection Layer

Disruption is rarely “surprise-only.” Our Predictive Protection Layer uses near-term signals (forecasted rain, AQI trends, heat risk) to estimate when a delivery partner’s operational area is likely to cross coverage thresholds.

What it delivers:
- **Advance alerts** to help delivery partners plan shifts and avoid avoidable downtime
- **Clearer trust** through transparency: coverage decisions are explained using objective, time-bounded predictions
- **Better outcomes for genuine users** by reducing verification delays when disruption is imminent

---

## 3. Persona

**“Arjun” — Swiggy delivery partner in Hyderabad**
- Works 5–6 days/week, rides during predictable peak windows
- Earnings depend on weather and local conditions
- Has limited time for paperwork, calls, and long claim processes
- Needs reassurance: *“When the environment shuts down deliveries, I get supported quickly.”*

---

## 4. Key Features

- AI-powered risk assessment
- Dynamic weekly premium
- Parametric triggers
- Automated claims
- Fraud detection
- Instant payouts

---

## 5. Weekly Pricing Model

Gig income varies, so weekly premiums keep insurance aligned with cash flow.

How it works:
- Premium is computed weekly using:
  - Environmental exposure (historical and live disruption likelihood for the delivery partner’s operational area)
  - Risk scoring (low / medium / high risk)
  - Confidence level from multi-signal verification (GPS + device motion + IP consistency)
  - Delivery activity baseline (ensures payouts correlate with genuine operational disruption)

Why weekly is suitable for gig delivery partners:
- Matches real earning cycles
- Enables short-term coverage during periods of elevated risk
- Minimizes long-term commitment for delivery partners with changing schedules

---

## 6. Parametric Triggers

Claims are triggered by objective, measurable environmental conditions—no subjective claims.

Examples:
- Rainfall trigger: `rainfall > threshold mm/hr` in the delivery partner’s delivery zone
- Air quality trigger: `AQI > threshold` for the active operational area
- Extreme heat trigger: `heat index > threshold` (or temperature + humidity risk composite)

Automatic claim triggering:
1. Environmental services detect threshold breach in a defined geofence region.
2. The system maps the disruption to delivery partners whose coverage area intersects the affected region.
3. A claim is created automatically and enters verification workflow.
4. Fraud checks + delivery validation determine payout outcome.

---

## 7. AI Integration

We keep AI purposeful and explainable—supporting premium fairness, verification, and reliability.

AI components:
- Risk scoring for premium
  - Computes delivery partner risk as Low / Medium / High
  - Uses signals like disruption frequency, location stability, and delivery activity reliability
- Fraud detection (anomaly detection)
  - Flags sudden location inconsistencies
  - Flags device identity anomalies
  - Flags unusual timing of claims vs delivery partner activity
  - Uses anomaly detection to identify suspicious behavior patterns
- Optional predictive alerts
  - Early warnings for delivery partners when disruption likelihood is rising (e.g., forecasted AQI/rain)
  - Helps delivery partners plan shifts while maintaining transparent policy behavior

---

## 8. Adversarial Defense & Anti-Spoofing Strategy (VERY IMPORTANT)

We don’t just detect fake users — we detect **coordinated fraud ecosystems**. Parametric systems can be abused if attackers spoof location or coordinate mass claims, so our design assumes adversaries and handles them realistically.

### Multi-Signal Location Verification (GPS + IP + Device Motion)
We verify that the delivery partner is actually operating within the claimed zone using:
- GPS geofence consistency (accuracy-aware)
- IP geolocation alignment (detects VPN/tunneling mismatch)
- Device motion patterns (accelerometer/gyroscope signatures) — confirms movement plausibility for a delivery route vs static spoofing

Decision logic:
- If signals strongly agree → eligible for fast verification
- If partially disagree → request additional evidence
- If strongly conflict → deny or downgrade payout confidence

### Behavioral Pattern Detection (Mass Claims, Same Timing)
Fraud often appears as coordinated behavior:
- Mass claim bursts by the same device clusters or overlapping profiles
- Same timing across many delivery partners in short windows (non-natural operational coincidence)
- Repeated claim patterns inconsistent with delivery schedules

The system reduces payout probability when behavior resembles coordinated abuse.

### Delivery Activity Validation
We validate whether the delivery partner’s activity correlates with operational disruption:
- Delivery app event patterns (active shifts, completion rate)
- Timeline alignment: claim trigger window must match reduced delivery activity
- No activity, but claim patterns are heavily scrutinized

This ensures payouts support genuine income loss, not just environmental thresholds.

### Environmental Cross-Check (Weather APIs)
We cross-validate triggers to reduce region confusion:
- Multiple weather/environment API sources
- Local geospatial sampling to ensure the trigger applies to the delivery partner’s operational area
- Confidence scoring based on source agreement

### Fraud Ring Detection Using Clustering
To detect organized fraud rings:
- Represent entities as vectors:
  - device fingerprints
  - claim timing
  - geofence overlap patterns
  - IP/GPS consistency metrics
- Apply clustering to find groups of coordinated actors
- Once clusters exceed suspicion thresholds:
  - rate-limit claims
  - reduce payout multipliers
  - escalate accounts for manual review or full denial

### Risk Scoring System (Low, Medium, High Risk)
Every claim gets a risk label that determines payout outcome:
- Low risk: strong evidence + consistent multi-signal verification → full payout
- Medium risk: partial confidence mismatch → conditional payout or reduced amount
- High risk: strong adversarial indicators → deny or escalate for review

### Fairness (Partial Payouts for Genuine Users)
We avoid punishing honest delivery partners due to occasional device inaccuracies:
- If environmental triggers are valid but location confidence is ambiguous:
  - Partial payouts are issued instead of full denial

This preserves delivery partner trust and reduces harmful false negatives.

---

## 9. System Architecture

This system is designed to scale to millions of delivery partners, handling real-time disruption events and payouts efficiently.

A modular, event-driven design keeps the platform scalable and maintainable.

- React Frontend
- Delivery partner dashboard
  - Policy status + coverage confirmation
  - Claim progress and payout history
- Spring Boot Backend
  - Policy management and claim orchestration
  - Rule engine for trigger eligibility
  - Fraud decision workflows and payout authorization
  - Secure APIs for delivery partner interactions and claim status
- AI Service (Python)
  - Risk scoring model
  - Fraud/anomaly detection model
  - Clustering-based fraud ring detection
  - Predictive alerts (optional)
- Event-driven automation
  - Environmental triggers produce events
  - Claims automatically transition through verification states
  - Notifications and payouts triggered on successful checks
- APIs (Weather/Environment + Other Data)
  - Weather/rainfall and AQI/heat services
  - Geofencing and region-level mapping
  - Cross-source validation for robustness

---

## 10. Workflow

User → Policy → Trigger → Claim → Fraud check → Payout

1. **User** → Enroll in Policy (weekly coverage selection)
2. **Trigger** → Environmental thresholds breach in delivery partner geofence region
3. **Claim** → Claim is created automatically with relevant context
4. **Fraud check** → Multi-signal verification + anomaly detection + delivery validation
5. **Payout decision** → Apply risk scoring rules (full/partial/deny)
6. **Payout** → Instant payout execution and confirmation to delivery partner

---

## 11. Tech Stack

- Frontend: React
- Backend: Spring Boot (Java)
- AI Service: Python (risk scoring + anomaly detection + clustering)
- Database: relational storage for policies/claims + event logs (implementation choice fits production)
- APIs:
  - Weather/rainfall APIs
  - AQI / pollution data APIs
  - Heat/temperature risk services
- Automation: event-driven pipeline for triggers → claims → verification → payouts

---

## 12. Future Enhancements

- Predictive alerts (real-time forecast-based warnings)
- Hyperlocal risk maps (fine-grained geospatial risk visualization for delivery partners and admins)
- Scaling to millions of users
  - Caching and batching for environmental data
  - More efficient fraud clustering and incremental model updates
  - Stronger monitoring and reliability controls for payout automation

---

## 13. Why This Solution Stands Out

- **Automation-first coverage**: triggers + claims + payouts run on objective thresholds—no slow paperwork cycles.
- **Delivery-partner-first verification**: multi-signal checks minimize false denials, with **fair partial payouts** when evidence is incomplete.
- **Real fraud resilience**: we detect coordinated rings, not just individual anomalies, and route suspicious claims through risk scoring.
- **Scales to real adoption**: weekly pricing + event-driven processing keep the model practical as user counts grow.

This platform brings insurance closer to delivery partners’ lived experience—**income protection that activates when disruption hits, not months later.**

We are not just building insurance — we are building a real-time financial safety net for India’s gig economy.

