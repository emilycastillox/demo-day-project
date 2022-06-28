// Practice Characters 

document.querySelector('button').addEventListener('click', getNewChar)

function getNewChar(){
fetch("http://ccdb.hemiola.com/characters?filter=gb&fields=kDefinition,kMandarin,string") 
    .then(res => res.json()) // parse response as JSON 
    .then(data => { 
      console.log(data) 
      let max = data.length
 let randomIndex = Math.floor(Math.random() * data.length);
        let randomChar = data[randomIndex]
        console.log(randomChar)
      let ul = document.querySelector('ul')
        const li = document.createElement('li')
        ul.appendChild(li)
        let h3 = document.createElement('h3')
        li.appendChild(h3)
        h3.innerText = randomChar.string
        let p = document.createElement('p')
        li.appendChild(p)
        p.innerText = randomChar.kDefinition
        let p2 = document.createElement('p')
        li.appendChild(p2) 
        p2.innerText = randomChar.kMandarin

        let a = document.createElement('a')
        a.href = `/profile/${randomChar.string}/${randomChar.kDefinition}/${randomChar.kMandarin}`
        li.appendChild(a)

        let addButton = document.createElement('button')
        addButton.innerText = 'Add to Library'
        a.appendChild(addButton)

  })
    .catch(err => { 
        console.log(`error ${err}`) 
    }); 

  }
