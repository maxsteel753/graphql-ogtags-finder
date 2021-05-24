# OGTag Finder using GraphQl

Simple Endpoint to find the ogTags in any website using information in meta tags or body content.
## Deployed over aws lambda using serverless

Tech Stack Used:

- NodeJS
- GraphQl
- Apollo Server
- AWS Lambda(Serverless)
- MongoDB (MongoDb Atlas)

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
