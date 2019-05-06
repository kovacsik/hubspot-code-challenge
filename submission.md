# Submission Notes

These notes will be read by HubSpot developers. Drop us a line!

## Given more time, what would you have done differently?

I would have implemented more features, such as the search box and creating a filter for the "Year" dropdown menu.
<br><br>
I would have tried to make the css styling better.
<br><br>
I would have went through the code a bit more to try and optimize everything that I can.

## How did you deviate from the directions, if at all, and why?

I decided to use React.
<br><br>
I kept the original EJS markup, but I put that markup into React components while keeping the same name (ex: filterable-content.ejs to FilterableContent.js). I also added a class or id to some tags. I did not add, edit, or remove any existing elements / tags.
<br><br>
I didn't need to implement something like Gulp because I used React's builder after creating the project using:
<br>
`npx create-react-app my-app`
<br>
However, I have used Webpack before in different projects with ease.
<br><br>
I used React because it is a modern framework that I want to get better with and I know that HubSpot uses React in their projects.
I have little experience with React (my experience comes from VueJS), so it may not be perfect, but I had fun doing it and the requirements from the code exercise works exactly as it should.

## Is there anything else you'd like to let us know?

I had to change the movie poster URLs in the data.json file because the URLs were not working. So, I created another file called data-revised-poster-urls.json under the data folder with the updated URLs. The only thing I changed were the URLs.
<br><br>
I added a quick "Results" section underneath the FilterableContent component to display the number of media items shown. The number updates while filtering. For example, if you choose some filters that narrow down the results to 5 items, then the "Results" section will display 5.
<br><br>
The structure of the DOM elements in the EJS files were definitely unique.  I did not expect so many divs in the filterable-content file!
<br><br>
Overall, this was a great challenge and I enjoyed bulding this! Thanks!
