export default function () {
  // var ret;
  // if(window.localStorage.getItem('projectList')){
  //   ret=JSON.parse(window.localStorage.getItem('projectList')).procedures;
  // }else{
  //   ret = [
return [
      {
        name: 'Procedura budowy fundamentów',
        toDoList: [
          {text: 'Wykop wykonany na głębokość minimum 1m',status: false},
          {text: 'Wykop wykonany na szerokość od 50 cm do 100 cm',status: false},
          {text: 'Brak wód gruntowych',status: false},
        ],
        done:0
      },
      {
        name: 'Procedura budowy dachu',
        toDoList: [
          {text: 'Konstrukcja zgodna z projektem',status: false},
          {text: 'Belki zabezpieczone przed wilgocią',status: false},
          {text: 'Nachylenie dachu przynajmniej 10%',status: false},
        ],
        done:0
      },
      {
        name: 'Projekt architektoniczny',
        toDoList: [
          {text: 'wybór odpowiedniego projektu',status: false},
          {text: 'rejestracja w urzędzie',status: false},
          {text: 'dostarczenie projrktu firmie budowlanej',status: false},
        ],
        done:0
      },
      {
        name: 'Kanalizacja',
        toDoList: [
          {text: 'dostęp do węzła kanalizacyjnego',status: false},
          {text: 'wykonanie kanalizacji zgodnie z projektem',status: false},
          {text: 'podłączenie do sieci',status: false},
        ],
        done:0
      },
      {
        name: 'Elektryka',
        toDoList: [
          {text: 'dostęp do węzła elektrycznego',status: false},
          {text: 'wykonanie elektryki zgodnie z projektem',status: false},
          {text: 'podłączenie do sieci',status: false},
        ],
        done:0
      },
      {
        name: 'Rejestracja',
        toDoList: [
          {text: 'złożenie wniosku w urzędzie miasta',status: false},
          {text: 'uzyskanie zgody w urzędzie miasta',status: false},
        ],
        done:0
      },
      {
        name: 'Stan surowy',
        toDoList: [
          {text: 'wykonanie budynku  w stanie surowym zgodnie z projektem architektonicznym',status: false},
        ],
        done:0
      },
      {
        name: 'Wykończenie',
        toDoList: [
          {text: 'gipsowanie scian',status: false},
          {text: 'malowanie scian',status: false},
          {text: 'toalety',status: false},
          {text: 'mebloscianki kuchenne',status: false},
          {text: 'okna',status: false},
          {text: 'elektryka',status: false},
          {text: 'hydraulika',status: false},
          {text: 'ogrzewanie',status: false},
        ],
        done:0
      }
    ];
  // }
  // return ret;

}
