![](https://israelforever.org/interact/blog/12_Cities_Splash_Page.jpg)

#  Cities in WikipediA

##   Our Website
The website is an informational website for searching information about cities in Isreal,It gives the user the option to search for any city in israel by an autocomplete text field, and serves the information about this city as it is in WikipediA  today.

## SO HOW DOES IT WORK
The app uses an API fetched from
    
   https://public.opendatasoft.com/api/records/1.0/search/?dataset=worldcitiespop&rows=10000&facet=country&refine.country=il

Which is an api specific for  information about cities acording to country,
The app showes to the user all the cities in Israel while he/she is tyeping the name of he city.
If the user picked a city from the option, an informatonal iframe will open to to display the information about this city as it is in WikipediA today

![site image](https://i.ibb.co/qmHfKtL/city-Complete.png)



The site goes out to the API every 24 hours at midnight to retreive the data and writes a JSON data file on the server. Every time a key is pressed it searches the data file held on the server and passes it to the front end to dsiplay as autocomplete. However, if the request from the user is the same as a recent one made (i.e the word has been typed before), then the data will be served directly from the cache and will not have to re-search the JSON file for the results. This ensures results are always served back to the user in the fastest possible way.

## Heigh Level Design

 ![](https://github.com/WebAhead5/auto_complete_faj/blob/faridsBranch/Design/heigh_level_design.png) 

---
https://cities-in-wikipedia.herokuapp.com/

# HAVE FUN 



