# OGTag Finder using GraphQl

Simple Endpoint to find the ogTags in any website using information in meta tags or body content.
## Deployed over aws lambda using serverless

Tech Stack Used:

- NodeJS 14.x (Minimum)
- GraphQl
- Apollo Server
- AWS Lambda(Serverless)
- MongoDB (MongoDb Atlas)
- Jest (For Testing)

Demo URL= https://vcmpiyez47.execute-api.us-east-1.amazonaws.com/dev/graphql
## Format for Query
```json
query {
  getOgMetadata(url:"https://www.example.com"){
    ogTitle
    ogImages
    ogDescription
    ogKeywords
  }
}
```
