CLAWORA BEAUTY — GITHUB PAGES E-COMMERCE FRONTEND

THIS PACKAGE INCLUDES
- Premium editorial storefront, deliberately different from your current Shopify look
- 48 active products imported from the connected Clawora Beauty Shopify catalog
- Shopify-hosted featured product images
- Product search
- Brand filters
- Category filters
- Product detail popup
- Cart drawer
- Cash-on-delivery / WhatsApp order flow
- Catalog Manager for add/edit/delete without writing code
- Mobile responsive design
- GitHub Pages ready

IMPORTANT: GITHUB PAGES LIMITATION
GitHub Pages is static hosting. It cannot safely process card payments or keep a secret admin database on its own.
This package is usable for product browsing, cart, COD and WhatsApp ordering.
For card payments, customer accounts, live inventory sync or a password-protected admin backend, connect a backend/payment provider later.

PUBLISH ON GITHUB
1. Create a new GitHub repository, e.g. clawora-storefront
2. Upload every file from this ZIP to the repository root
3. Open Settings -> Pages
4. Source: Deploy from a branch
5. Branch: main
6. Folder: /(root)
7. Save
8. GitHub gives you the free github.io website link

CONNECT A CUSTOM DOMAIN
1. Buy a domain from any registrar
2. GitHub repo -> Settings -> Pages -> Custom domain
3. Enter the domain
4. Add the DNS records GitHub asks for at your registrar
5. Wait for DNS to update
6. Enable Enforce HTTPS

CHANGE PRODUCTS WITHOUT CODING
1. Open /catalog-manager.html on your live website
2. Add/edit/delete products
3. Tap Download products.json
4. In GitHub replace the old products.json with the downloaded one
5. Commit changes
6. GitHub Pages updates the live website automatically

ENABLE WHATSAPP CHECKOUT
Open store-config.js and set:
whatsappNumber:"92XXXXXXXXXX"
Use digits only with country code and no + sign.

OPTIONAL STORE DETAILS
In store-config.js you can also add supportEmail and Instagram later.

CATALOG SOURCE
The initial catalog was seeded from the active products returned by the connected Clawora Beauty Shopify store on 2026-09-06.
