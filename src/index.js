// const { ApolloServer, gql } = require('apollo-server');
const { gql } = require('apollo-server-lambda');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://root:root1234@cluster0.aeg6a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const meta= require('./metadata/meta');
const typeDefs = gql`
  type ogTag {
    ogTitle: String!
    ogDescription: String
    ogImages:String
    ogKeywords:String
    url:String!
  }
  type Query {
    getOgMetadata(url:String): [ogTag]
  }
`;
const resolvers = {
    Query: {
        async getOgMetadata(parents,args,ctx,info)  {
           // console.log(args);
           let tags=[];
           let insert=false;
           const client = await MongoClient.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true });
            var db = client.db('ogTags')
           //// Check for value already in database
            tags = await db.collection('ogTags').find({url:args.url}).toArray().then(res => { return res[0] });
            /// if not run this process 
            if(!tags) {
                tags= await  meta.getMetaData(args.url)   
                if(tags){
                    insert=true;
                }
            }
            let ogTags= {
                ogTitle:tags.ogTitle,
                ogDescription:tags.ogDescription,
                ogImages:tags.ogImages,
                ogKeywords:tags.ogKeywords,
                url:args.url
            }
            if(insert){
                await db.collection('ogTags').insertOne(ogTags)
            }
            return [ogTags]
        }
    }
}



module.exports ={ typeDefs, resolvers };
