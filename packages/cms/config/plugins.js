const name = require('./name')

module.exports = ({ env }) => ({
  'transformer': {
    enabled: true,
  },
  'entity-notes': {
    enabled: true,
  },
  'seo': {
    enabled: true,
  },
  'graphql': {
    enabled: true,
    config: {
      endpoint: '/graphql',
      shadowCRUD: true,
      subscriptions: true,
      playgroundAlways: env('NODE_ENV', 'development') === 'development',
    },
  },
  'upload': {
    enabled: true,
    config: {
      provider: 'aws-s3',
      providerOptions: {
        accessKeyId: env('S3_ACCESS_KEY_ID'),
        secretAccessKey: env('S3_SECRET_ACCESS_KEY'),
        endpoint: env('S3_ENDPOINT'),
        params: {
          Bucket: `${env('S3_BUCKET', `bn-dev/${name}`)}/uploads`,
        },
      },
    },
  },
  'email': {
    enabled: true,
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: env('SMTP_HOST', 'bndigital.dev'),
        port: env('SMTP_PORT', 31025),
        auth: {
          user: env('SMTP_USERNAME', ''),
          pass: env('SMTP_PASSWORD', ''),
        },
      },
      settings: {
        defaultFrom: env('SMTP_MAIL_FROM', `no-reply@${env('DOMAIN', `${name}.bndigital.dev`)}`),
        defaultReplyTo: env('SMTP_MAIL_TO', `no-reply@${env('DOMAIN', `${name}.bndigital.dev`)}`),
      },
    },
  },
})
