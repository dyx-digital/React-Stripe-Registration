# Stripe React App

Template code for a registration form using Stripe. With Wechat Pay, Alipay, Credit Card acceptance 

To test:
`yarn`, then `yarn start`

To deploy:
`yarn build` then `yarn deploy`

Go to AWS Cloudfront, deploy a new version. Make sure **HTTP to HTTPS redirects** and **allowed methods include GET, POST, OPTIONS**

### Workflow:
1. make commits in `dev` branch
2. cherry-pick `dev` commmits to `production`, 
3. to make sure testing flags and Stripe dev/prod keys don't accidentally get merged
