console.log('sett')
ServiceConfiguration.configurations.upsert(
  { service: "code-meets-coffee" },
  {
    $set: {
      clientId: Meteor.settings.public.GITHUB_CLIENT_ID,
      loginStyle: "popup",
      secret: Meteor.settings.public.GITHUB_CLIENT_SECRET
    }
  }
);