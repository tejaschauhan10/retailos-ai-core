# Integrations Platform

Architectural placeholders for third-party connectors. Each domain is a
folder with the same shape:

```
<domain>/
  providers/   # Provider descriptors + registry
  services/    # Domain service facades feature modules consume
  types/       # Shared domain types (Invoice, Order, Shipment, ...)
  adapters/    # Provider-specific implementations of the service contract
  README.md
```

No implementations live here yet. Providers are registered at runtime once
we add the concrete adapter.

## Planned providers by domain

| Domain         | Providers (planned)                              |
| -------------- | ------------------------------------------------ |
| accounting     | Vyapar, Busy, Tally, Zoho Books, QuickBooks       |
| billing        | Zoho Invoice, Chargebee                          |
| commerce       | Shopify, WooCommerce, Amazon, Flipkart, Meesho    |
| communication  | WhatsApp Cloud, SMS, Email, Push                 |
| payments       | Razorpay, Stripe, Cashfree, PayU, UPI            |
| shipping       | Shiprocket, Delhivery, DTDC, EasyPost, ShipStation|

Never couple business modules to a specific provider — always go through the
domain service.
