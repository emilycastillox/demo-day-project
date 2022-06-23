# LianxiLab: A Fullstack, web app to practice and keep Chinese Characters

In college I majored in Chinese Language. I found the language fun and enjoyable to learn. However, when learning Chinese, there are hundreds of characters you may not be able to keep track of and learn in your lifetime. This application allows users to keep a “library” or dictionary of Chinese characters, their definition, and pronunciation that the user can record- for the characters they have already learned. Users will also get to study and learn new characters that will be given to them randomly upon daily login, allowing them to track their progress each day. Lianxi 练习（lee-an shee) means “to practice” in Chinese (mandarin).

![firs](https://user-images.githubusercontent.com/102037717/175324165-7e7460b1-4059-4a5a-a9ff-5f61297f2b21.gif)

![sec](https://user-images.githubusercontent.com/102037717/175324456-444f2cdf-9443-47ec-84ee-b890cccd9015.gif)

![thir](https://user-images.githubusercontent.com/102037717/175324800-757400ca-21b1-411c-a83e-2e7eb44621be.gif)

## How It's Made:

**Tech used:** HTML, CSS, JavaScript, Node.js, Express, MongoDB, EJS, Passport, Chinese Character Web API, MediaStream Recording API

Designing this project was fun - I am always excited when it comes to CSS and UI, so I created a simple, design that was readable, easy to navigate, all with a clean look. The CSS design was created by myself. I used client-side Javascript to create the Media Stream API function for users to record the character pronounciation - which was found on MDN.I also used client-side Javascriptfor my "practice" page where I connected a Chinese Character Web API to gather all existing Chinese Characters, Definitions and Pinyin - along with a function to randomize the way they are displayed in HTML. On the server side, I used EJS as my templating language to manipulate the DOM and post the Chinese Character information in our MongoDB database, for the profile and Study sections as well.


## Future Optimizations:

I would love to ease the user experience when inputing a new Character into their library. Ideally, the user will be able to record their pronounciation, review the sound - and the audio file should autofill into the file input so users do not have to download and then submit the audio file in the input. Additionally, I would want to incorporate a Chinese writing to character recognition function that other  Chinese websites I have used include (see Line Dictionary) for users to write a character with their mouse and it will recognize the character, and spit out the definition or autofill in the input. 

## Lessons Learned:

Building this project reminded me just how far I have come as a Software Engineer. This has solidified my knowldge of the backend and how everything is connected, along with continuous improvement of my design and ability to present my work to an audience. This project is a living example of my past and present experience aligning and working together, cohesively. 
