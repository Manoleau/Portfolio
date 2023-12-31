fetch('/hero/info?id=1')
    .then(response => response.json())
    .then(hero => {
        const herodiv = document.getElementById('hero')
        const h1_hero = document.createElement('h1')
        const p_hero = document.createElement('p')
        h1_hero.textContent = `${hero[0].prenom} ${hero[0].nom}`
        p_hero.textContent = `${hero[0].age} ans . ${hero[0].nationalite} . ${hero[0].personnalite} . ${hero[0].profession}`
        herodiv.appendChild(h1_hero)
        herodiv.appendChild(p_hero)
        


        const about = document.getElementById('about-me')
        const img = document.createElement('img')
        if(hero[0].image){
            img.src = hero[0].image
        } else {
            img.src = "img/3135715.png"
        }
        about.appendChild(img)
        const description = hero[0].description.split("|")
        for (let i = 0; i < description.length; i++) {
            let p = document.createElement('p')
            p.textContent = description[i]
            about.appendChild(p)
        }
        const ul = document.getElementById('objectives').getElementsByTagName('ul')[0]
        objectifs = hero[0].objectifs.split("|")
        for(let i = 0; i<objectifs.length; i++){
            let tmp = objectifs[i].split("$")
            const li_obj = document.createElement('li');
            const h4_obj = document.createElement('h4');
            const p_obj = document.createElement('p');
            h4_obj.textContent = tmp[0]
            p_obj.textContent = tmp[1]
            li_obj.appendChild(h4_obj)
            li_obj.appendChild(p_obj)
            ul.appendChild(li_obj)
        }
        
    })
    .catch(error => console.error('Erreur:', error));

fetch('/projets/info')
    .then(response => response.json())
    .then(projects => {
        const menu_projets = document.getElementById('dropdown-content');
        projects.forEach(project => {

            const a_menu = document.createElement('a')
            a_menu.textContent = project.name
            menu_projets.appendChild(a_menu)
        });
    })
    .catch(error => console.error('Erreur:', error));


fetch('/exppro/info')
    .then(response => response.json())
    .then(exps => {
        const ul = document.getElementById('professional-experience').getElementsByTagName('ul')[0];
        // const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' };
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        exps.forEach(exp => {
            const li = document.createElement('li');
            const strong = document.createElement('strong');
            strong.textContent = exp.titrePoste;
            const span = document.createElement('span')
            const dateDebut = new Date(exp.dateDebut)
            if (exp.dateFin) {
                var dateFin = new Date(exp.dateFin);
                span.textContent = ` - ${exp.typeExp} - ${exp.nomEntreprise} (${dateDebut.toLocaleDateString('fr-FR', options)} - ${dateFin.toLocaleDateString('fr-FR', options)})`;
            } else {
                span.textContent = ` - ${exp.typeExp} - ${exp.nomEntreprise} (${dateDebut.toLocaleDateString('fr-FR', options)} - En cours...)`;

            }
            const p = document.createElement('p');
            p.textContent = exp.description;
            li.appendChild(strong);
            li.appendChild(span);
            li.appendChild(p);
            ul.appendChild(li);
        })

    })
    .catch(error => console.error('Erreur:', error));