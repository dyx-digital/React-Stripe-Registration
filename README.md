# Stripe React App

Template code for a registration form using Stripe. With Wechat Pay, Alipay, Credit Card acceptance 

To test:
`yarn`, then `yarn start`

To deploy:
`yarn build` then `yarn deploy`

## Deployment with AWS S3/Cloudfront
Go to AWS Cloudfront, deploy a new version. Make sure **HTTP to HTTPS redirects** and **allowed methods include GET, POST, OPTIONS**

### Workflow:
1. make commits in `dev` branch
2. cherry-pick `dev` commmits to `production`, 
3. to make sure testing flags and Stripe dev/prod keys don't accidentally get merged

## Checklist
Checkout.js
- [ ] Add homepage URL
- [ ] Add Lambda for AWS SES 
CreditCardPayment.js
- [ ] Add Lambda for Stripe PaymentIntent 
Review.js
- [ ] Add Stripe Public Key
- [ ] Add Success Page URL
UploadButton.js
- [ ] Add S3 Bucket URL
- [ ] Add Lambda for File Upload
