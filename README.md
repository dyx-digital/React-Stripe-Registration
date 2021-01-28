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

- [ ] Sign up Stripe
- [ ] Sign up AWS
- [ ] Gather Information https://docs.google.com/document/d/1uFTVrtVu84Htq_w031ajPbcdXczL63QMcpKblc62-qA/edit?usp=sharing

## AWS Setup

- [ ] Setup AWS S3 bucket and change package.json
- [ ] Create admin user -> sign into AWS CLI account 
- [ ] aws configure 

- [ ] PaymentIntent - Lambda
- [ ] Webhook - Lambda
- [ ] File Uploads - https://serverlessrepo.aws.amazon.com/applications/arn:aws:serverlessrepo:us-east-1:526237104669:applications~Serverless-S3-Uploader
- [ ] Email - SES -> create Admin SES user

## Code Changes

Checkout.js
- [ ] Add homepage URL
- [ ] Add Lambda for AWS SES

CreditCardPayment.js
- [ ] Add Dev Lambda for Stripe PaymentIntent 

Review.js
- [ ] Add Test Stripe Public Key
- [ ] Add Success Page URL 

UploadButton.js
- [ ] Add S3 Bucket URL
- [ ] Add Lambda API URL for File Upload

## Testing
- [ ] Form fills 
- [ ] Email sent properly
- [ ] File uploads succeed

- [ ] Test credit card
- [ ] Test wechat
- [ ] Test alipay

## Deployment

git checkout -b prod

CreditCardPayment.js
- [ ] Add Prod Lambda URL

Review.js
- [ ] Put in Prod Stripe PK

### General Deployment Checklist
- [ ] Change Alipay Success Page URL to the real Wix Success Page URL
- [ ] Prod Webhook deployed to Stripe
- [ ] Deploy to S3 - CloudFront