const cheerio = require('cheerio');
const got = require('got');

const getMetaData = async  (url) => {
    let response;
     try{
        response = await got.get(url,{
            headers: {
                'user-agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
            }
        });
        return  ogTagsFetcher(response.body);
     }catch(ex){
         
         console.log(ex);
         return {};
     }
}
const ogTagsFetcher = (html) => {
       const $ = cheerio.load(html);
       let tags={};
        /*
            For Title
                1. Look for the og:title
                2. if not then look for title tag
                3. if not then look for meta title
                4. last case we can pick up the first heading of the page as titile 
        */ 
       tags.ogTitle = $('meta[property="og:title"]').attr('content') || $('title').text() || $('meta[name="title"]').attr('content') || $('body h1').first().text() 
       /*
            For Description
                1. Look for the Og:description
                2. if not meta name=description
                3. if not meta then we can pick up the first h1
       */
       tags.ogDescription = $('meta[property="og:description"]').attr('content') || $('meta[name="description"]').attr('content') || $('body h1').first().text() 
        /*
            For Imgage
                1. Look for the Og:image
                2. if  not 1 then og:image:url
                3. if  not 2 then we look for first imagge tag
       */
       tags.ogImage = $('meta[property="og:image"]').attr('content') || $('meta[property="og:image:url"]').attr('content') || $('img').first().attr('src')
       /*
            For Imgage
                1. Look for the Og:keywords
                2. if  not 1 then meta keywords
                3. if  not 2 then null
       */
       tags.ogKeywords = $('meta[property="og:keywords"]').attr('content') || $('meta[name="keywords"]').attr('content') || null
       return tags;   
}
module.exports = {getMetaData};