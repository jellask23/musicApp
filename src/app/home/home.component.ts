import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { formatDate } from '@angular/common';
import { slideInAnimation } from '../animation';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [slideInAnimation]
})
export class HomeComponent implements OnInit {

  audio = new Audio();

  j = 0;

  play: boolean = true;

  currentTime: any = "0:00";
  durationTime: any = "0:00";
  seek: any
  durationseek: any;

  start = false;
  shufflePlay = true;
  repeatLoop = false;
  libraryView = true;

  screen_playlist = false;
  screen_lyrics = false;
  screen_search = false;
  screen_search_sub = false;
  screen_home = false;
  screen_library = true;
  screen_libraryPlaylist = true;

  orginal_array = [
    {
      url: "../../assets/audio/Chitti.mp3",
      photo: "../../assets/images/crop_480x480_1610357558.jpg",
      color: "linear-gradient(150deg,#425748, #242e27, #000)",
      title: 'Chitti (From "Jathi Ratnalu")',
      artist: 'Ram Miryala, Radhan',
      lyrics_color: "#c2131f",
      fav: true,
      lyrics: "చిట్టి నీ నవ్వంటే లక్ష్మి పటాసే <br> ఫట్టుమని పేలిందా నా గుండె ఖల్లాసే<br>అట్ట నువ్ గిర్రా గిర్రా మెలికల్ తిరిగే ఆ ఊసే<br> నువ్వు నాకు setయ్యావని signal ఇచ్చే<br> breaking న్యూసే<br> వచ్చేశావే lineలోకి వచ్చేశావే<br> చిమ్మ చీకటికున్న जिंदगीలోన floodlight<br>ఏశావే<br> హత్తెరీ నచ్చేసావే మస్తుగా నచ్చేసావే<br> Black అండ్ white localగాని లోకంలోన<br> రంగులు పూసావే<br> చిట్టి నా బుల్ బుల్ చిట్టి<br> చిట్టి నా చుల్ బుల్ చిట్నా<br> రెండు బుగ్గలు పట్టి ముద్దులు పెట్టావే<br>చిట్టి నా జిల్ జిల్ చిట్ట చిట్టీ<br> నా రెడ్ బుల్ చిట్టి <br> నా పేస్ బుక్కులో లక్ష లైకులు కొట్టావే<br><br>యుద్ధమేమి జరగలే<br> సుమోలేవి అస్సలెగరలే<br>చిటికెలో అలా చిన్న నవ్వుతో పచ్చజెండ చూపించినావే<br>మేడం ఎలిజబెత్తు నీ రేంజ్ అయినా<br>తాడు బొంగరం లేని ఆవారా.<br> నేనే అయినా<br>మాసుగాడి మనసుకే ఓటేసావే<br> బంగ్లా నుండి బస్తీకి ఫ్లైటెశావే<br>తీన్ మార్ చిన్నోడిని, డీజే స్టెప్పులు ఆడిస్తివే<br>నసీబు బ్యాడు ఉన్నోన్ని నవాబు చేసేస్తివే<br>అతిలోక సుందరివి నువ్, ఆఫ్ట్రాల్ ఓ టప్పోరి నేను<br>గూగుల్ మ్యాప్ అయి నీ గుండెకు చేరిస్తివే<br><br>అరెరే ఇచ్చేసావే<br>దిల్లు నాకు ఇచ్చేసావే<br>మిర్చిబజ్జి లాంటి లైఫ్ లో నువ్వు ఆనియన్ ఏసావే<br>అరెరే గిచ్చేసావే లవ్వు టాటూ గుచ్చేసావే<br>మస్తు మస్తు బిర్యానీలో నింబూ చెక్కై హల్చల్ చేశావే<br><br>చిట్టి నా బుల్ బుల్ చిట్టి,<br>చిట్టి నా చుల్ బుల్ చిట్టి<br>నా రెండు బుగ్గలు పట్టి ముద్దులు పెట్టావే<br><br>చిట్టి నా జిల్ జిల్ చిట్టి, చిట్టీ<br> నా రెడ్ బుల్ చిట్టి<br>నా పేస్ బుక్కులో లక్ష లైకులు కొట్టావే"
    },
    {
      url: "../../assets/audio/Amrutha.mp3",
      photo: "../../assets/images/amrutha_song.jpg",
      color: "linear-gradient(150deg,#3d3e38, #232321, #000)",
      title: 'Amrutha (From "Solo Brathuke So Better")',
      artist: 'Thaman S, Nakash Aziz',
      lyrics_color: "#9e6e19",
      fav: false,
      lyrics: "బల్బు కనిపెట్టినోడికే <br>బ్రతుకే సిమ్మ సీకటి అయిపోయిందే <br>సెల్లు ఫోను కంపినోడికే<br>సిమ్ము కార్డే బ్లాక్ అయిపోయిందే<br>రూట్ చూపే గూగుల్ అమ్మనేఇంటి రూట్ నే మర్చిపోయిందే<br>రైట్ టైం చెప్పే వాచుకే<br>బాడ్ టైమే స్టార్ట్ అయిపోయిందే<br>అగ్గి పుల్ల నేనే మెల్లగా కాల్చుతుంటే<br>సొంత కొంపనే ఫుల్లుగా <br>అంటుకున్నదే<br>పాస్టు లైఫులో నేను చెప్పిన ఎదవ మాటే<br>బ్రైట్ ఫ్యూచరే నీల తగలెడుతుందే<br>ఒగ్గేసి పోకే అమృత<br>నేను తట్టుకోక మందు తాగుతా<br>ఒట్టేసి సెప్తున్న అమృత<br>నువ్వు వెళ్ళిపోతే ఒంటరైపోతా<br>ఒగ్గేసి పోకే అమృత<br>నేను తట్టుకోక మందు తాగుతా<br>ఒట్టేసి సెప్తున్న అమృత<br>నువ్వు వెళ్ళిపోతే ఒంటరైపోతా"
    },
    {
      url: "../../assets/audio/ManaJathiratnalu.mp3",
      photo: "../../assets/images/ManaJathiratnalu.jpg",
      color: "linear-gradient(150deg,#3a6d68, #213432, #000)",
      title: 'Mana Jathiratnalu (From "Jathi Ratnalu")',
      artist: 'Rahul Sipligunj, Nakash Aziz',
      lyrics_color: "#008654",
      fav: false,
      lyrics: "శూ శూదు హెరొలు<br>ఓత్తి భుద్దర ఖానులు <br>వలుఎ ళెని వజ్రాలు<br>ంఅన ఝాథి ఋఅథ్నాలు<br>ఏఎ శుత్తు ఫధూల్లు <br>ళెరె ఈత్లాంతొల్లు<br>వీల్లైనా ఫుత్తాలంతె ఈంకొ వంధెల్లు<br>శతెల్లితె ఖైనా ఛిక్కరు <br>వీల్లొ ఘుల్ల్య్ ఋఒచ్కెత్లు<br>డైల్య్ భిల్లుగతెస్ ఖి ంఒక్కె వీల్లై ఛిల్లుల ఫొచ్కెత్లు<br>శుద్ధాపూసలు శొంతె ంఆతలు <br>ఠిందికి ఠిమ్మ ఋఆజులు<br>ఫంతె ళెవరు, ళెస్థె ఆఅగరు <br>ఫనికి ఫొథరాజులు<br>శూ శూదు హెరొలు<br>ఓత్తి భుద్దర ఖానులు <br>వలుఎ ళెని వజ్రాలు"
    },
    {
      url: "../../assets/audio/MasterRaid.mp3",
      photo: "../../assets/images/master.jpeg",
      color: "linear-gradient(150deg,#6d1b0d, #311511, #000)",
      title: 'Master Raid',
      artist: 'Anirudh Ravichander, Arivu',
      lyrics_color: "#f3281b",
      fav: false,
      lyrics: "A Aa E Ee Raa<br>Apnaa Time Raa<br>Nippu Navvutho<br>Ride-U Start-U Raa<br>A Aa E Ee Raa<br> Apnaa Time Raa<br>Ride-U Start-U Ra<br>World Standard Ee Local Master<br>Line Dhaati Muttukunte<br> Okkatichhi Pamputhaadu<br>Chattamunnachotu Idhi<br> Life-U Maarche Home-U<br>Lonakochhi Thappu Chesthe<br> Master Ride Come<br>Master Ride-U, Master Ride-U<br> Master Ride-U<br>Master, Manchi Daari Korukunte Chooputhaadu<br>Vachhi Master Wanted Gaa<br> Wrong-U Cheiku Oppukodu<br>Idhi Master Ride-U, Master Ride-U<br> Master Ride-U<br>Master Ride-U, Master Ride-U<br> Master Ride-U<br>"
    },
    {
      url: "../../assets/audio/HeyAbbayi.mp3",
      photo: "../../assets/images/HeyAbbayi.jpg",
      color: "linear-gradient(150deg,#626258, #31322e, #000)",
      title: 'Hey Abbayi',
      artist: 'Micky J. Meyer, Nutana Mohan, Hymath',
      lyrics_color: "#967353",
      fav: false,
      lyrics: "No No వద్దన్నా<br> నిను follow చేస్తున్నా<br>ఏదో రోజు yes అంటావని<br> ఎదురే చూస్తున్నా<br>హే పో పో పోమ్మన్నా<br> పడిగాపే కాస్తున్నా<br>Girlfriend అయ్యే moment కోసం ప్లానే వేస్తున్నా<br>Sorry అన్నా క్షమిస్తానా<br> నే వింటానా వస్తా ఏమైనా<br><br>Hey అబ్బాయి <br>హే Hey అబ్బాయి<br>ఇంకా ఫోజులు చాలోయి<br> కాస్తా ఇటేపు చూడోయి<br>హేయ్ అబ్బాయి<br> హే హేయ్ అబ్బాయి<br>సిగ్గేంటోయ్ అబ్బాయి<br> నీకే ముద్దోటిచ్చి పోగొట్టెయ్ నా<br><br>హేయ్ అబ్బాయి<br> హే హేయ్ అబ్బాయి<br>నేను చూస్తున్నా పరువే తీసేస్తున్నా<br>పోనీ పాపం అమ్మాయంటు వదిలేస్తూఉన్నా<br>నీదే తప్పున్నా<br> ఇన్నాళ్ళు తగ్గున్నా<br>పడనే నేను వదిలేయ్ నన్ను<br> ఆపేయ్ అంటున్నా<br>నువ్వేమన్నా వస్తానన్నా<br> నే వింటానా బుద్దిగా ఆగమ్మా<br><br>హేయ్ అమ్మాయి<br> హే హేయ్ అమ్మాయి<br>ఆపేసెయ్ గోలంటూ<br> ఇంకా ఎలాగ చెప్పాలి<br>హేయ్ అమ్మాయి<br> హే హేయ్ అమ్మాయి<br>ఓ మీదేపడిపోయి ఇట్టా కలరింగ్ ఇస్తే<br> కట్ చేసెయ్ నా<br><br>తెగ ప్రేమే ఉన్నా నీ పైన<br> చీపయ్యానా<br>తొలిచూపుల్లోనే మనసు నీదే తెలుసుకున్నా <br><br>ఇక అప్పట్నుంచే… ఏమైనా నీతో ఉన్నా<br>ఒక నిన్నే నిన్నే తగిన జోడనే ఊహిస్తున్న<br>నేడని రేపని ఎంతకాలమే అయినా<br>ఏదీ చూడక ఒక్కమాటపై నేనున్నా<br>అయినా నీకిది అర్థమైననూ కాకున్నా<br>అసలే నిన్ను వదిలేపోను<br> నీతోపాటే నేనుంటా, హేయ్<br><br>హేయ్ అబ్బాయి హే హేయ్ అబ్బాయి<br>ఇంకా ఫోజులు చాలోయి<br> కాస్తా ఇటేపు చూడోయి<br>హేయ్ అబ్బాయి<br> హే హేయ్ అబ్బాయి<br>సిగ్గేంటోయ్ అబ్బాయి<br> నీకే ముద్దోటిచ్చి పోగొట్టెయ్ నా"
    },
    {
      url: "../../assets/audio/Chellamma.mp3",
      photo: "../../assets/images/chellama.jpg",
      color: "linear-gradient(150deg,#4e493b, #272621, #000)",
      title: 'Chellamma (From "Doctor")',
      artist: 'Anirudh Ravichander, Jonita Gandhi',
      lyrics_color: "#9e792b",
      fav: false,
      lyrics: "இனிமே tiktok எல்லாம் இங்க ஃபேன்ம்மா <br>நேரா டூயட் பாட வாயேன்ம்மா<br>ரொம்ப ஸ்ட்ரிக்ட்டா இருந்ததெல்லாம் போதும்மா<br>கொஞ்சம் ஸ்வீட்டா சிரிச்சு பேசேம்மா<br><br>செல்லம்மா செல்லம்மா<br>அங்கம் மின்னும் தங்கம்மா<br>பொன்னம்மா மெல்லம்மா கட்டி கிள்ளேன்மா<br>கண்ணம்மா கண்ணம்மா<br>கண்ணு ரெண்டும் கன் அம்மா<br>கொஞ்சம்மா கொஞ்சிம்மா சுட்டு தள்ளேன்ம்மா<br><br>பொல்லாத வயச சீண்டித்தான் போனாயே<br>தடுத்தாலும் உனக்கே விழுவேன் நானே<br><br>கண்ணாடி மனச கல் வீசி பார்த்தாயே<br>ஒடஞ்சாலும் காட்டுவேன் உன்ன நானே<br><br>மெழுகு டால்லு நீ அழகு ஸ்கூல்லு நீ<br>எனக்கு ஏத்தவ நீதான்டி<br><br>ஹன்ட்சம் ஆளு நீ சூப்பர் கூழு நீ<br>நானும் நீயும்தான் செம ஜோடி<br><br>பொதுவா தோனி போல நானும் காம் மும்மா<br>இன்னைக்கு எக்ஸ்சைட்மென்ட் ஆனேன்ம்மா<br>கண்ணால் வளைய வீசி என்ன தூக்குமா<br>லைப் டைம் செட்டில்மென்ட் நான்தான்ம்மா<br><br>இனிமே டிக் டாக் எல்லாம் இங்க ஃபேன்ம்மா<br>நேரா டூயட் பாட வாயேன்ம்மா<br>ரொம்ப ஸ்ட்ரிக்ட்டா இருந்ததெல்லாம் போதும்மா<br>கொஞ்சம் ஸ்வீட்டா சிரிச்சு பேசேம்மா<br>"
    }
  ]

  audioFile = [
    {
      url: "../../assets/audio/Chitti.mp3",
      photo: "../../assets/images/crop_480x480_1610357558.jpg",
      color: "linear-gradient(150deg,#425748, #242e27, #000)",
      title: 'Chitti (From "Jathi Ratnalu")',
      artist: 'Ram Miryala, Radhan',
      lyrics_color: "#c2131f",
      fav: true,
      lyrics: "చిట్టి నీ నవ్వంటే లక్ష్మి పటాసే <br> ఫట్టుమని పేలిందా నా గుండె ఖల్లాసే<br>అట్ట నువ్ గిర్రా గిర్రా మెలికల్ తిరిగే ఆ ఊసే<br> నువ్వు నాకు setయ్యావని signal ఇచ్చే<br> breaking న్యూసే<br> వచ్చేశావే lineలోకి వచ్చేశావే<br> చిమ్మ చీకటికున్న जिंदगीలోన floodlight<br>ఏశావే<br> హత్తెరీ నచ్చేసావే మస్తుగా నచ్చేసావే<br> Black అండ్ white localగాని లోకంలోన<br> రంగులు పూసావే<br> చిట్టి నా బుల్ బుల్ చిట్టి<br> చిట్టి నా చుల్ బుల్ చిట్నా<br> రెండు బుగ్గలు పట్టి ముద్దులు పెట్టావే<br>చిట్టి నా జిల్ జిల్ చిట్ట చిట్టీ<br> నా రెడ్ బుల్ చిట్టి <br> నా పేస్ బుక్కులో లక్ష లైకులు కొట్టావే<br><br>యుద్ధమేమి జరగలే<br> సుమోలేవి అస్సలెగరలే<br>చిటికెలో అలా చిన్న నవ్వుతో పచ్చజెండ చూపించినావే<br>మేడం ఎలిజబెత్తు నీ రేంజ్ అయినా<br>తాడు బొంగరం లేని ఆవారా.<br> నేనే అయినా<br>మాసుగాడి మనసుకే ఓటేసావే<br> బంగ్లా నుండి బస్తీకి ఫ్లైటెశావే<br>తీన్ మార్ చిన్నోడిని, డీజే స్టెప్పులు ఆడిస్తివే<br>నసీబు బ్యాడు ఉన్నోన్ని నవాబు చేసేస్తివే<br>అతిలోక సుందరివి నువ్, ఆఫ్ట్రాల్ ఓ టప్పోరి నేను<br>గూగుల్ మ్యాప్ అయి నీ గుండెకు చేరిస్తివే<br><br>అరెరే ఇచ్చేసావే<br>దిల్లు నాకు ఇచ్చేసావే<br>మిర్చిబజ్జి లాంటి లైఫ్ లో నువ్వు ఆనియన్ ఏసావే<br>అరెరే గిచ్చేసావే లవ్వు టాటూ గుచ్చేసావే<br>మస్తు మస్తు బిర్యానీలో నింబూ చెక్కై హల్చల్ చేశావే<br><br>చిట్టి నా బుల్ బుల్ చిట్టి,<br>చిట్టి నా చుల్ బుల్ చిట్టి<br>నా రెండు బుగ్గలు పట్టి ముద్దులు పెట్టావే<br><br>చిట్టి నా జిల్ జిల్ చిట్టి, చిట్టీ<br> నా రెడ్ బుల్ చిట్టి<br>నా పేస్ బుక్కులో లక్ష లైకులు కొట్టావే"
    },
    {
      url: "../../assets/audio/Amrutha.mp3",
      photo: "../../assets/images/amrutha_song.jpg",
      color: "linear-gradient(150deg,#3d3e38, #232321, #000)",
      title: 'Amrutha (From "Solo Brathuke So Better")',
      artist: 'Thaman S, Nakash Aziz',
      lyrics_color: "#9e6e19",
      fav: false,
      lyrics: "బల్బు కనిపెట్టినోడికే <br>బ్రతుకే సిమ్మ సీకటి అయిపోయిందే <br>సెల్లు ఫోను కంపినోడికే<br>సిమ్ము కార్డే బ్లాక్ అయిపోయిందే<br>రూట్ చూపే గూగుల్ అమ్మనేఇంటి రూట్ నే మర్చిపోయిందే<br>రైట్ టైం చెప్పే వాచుకే<br>బాడ్ టైమే స్టార్ట్ అయిపోయిందే<br>అగ్గి పుల్ల నేనే మెల్లగా కాల్చుతుంటే<br>సొంత కొంపనే ఫుల్లుగా <br>అంటుకున్నదే<br>పాస్టు లైఫులో నేను చెప్పిన ఎదవ మాటే<br>బ్రైట్ ఫ్యూచరే నీల తగలెడుతుందే<br>ఒగ్గేసి పోకే అమృత<br>నేను తట్టుకోక మందు తాగుతా<br>ఒట్టేసి సెప్తున్న అమృత<br>నువ్వు వెళ్ళిపోతే ఒంటరైపోతా<br>ఒగ్గేసి పోకే అమృత<br>నేను తట్టుకోక మందు తాగుతా<br>ఒట్టేసి సెప్తున్న అమృత<br>నువ్వు వెళ్ళిపోతే ఒంటరైపోతా"
    },
    {
      url: "../../assets/audio/ManaJathiratnalu.mp3",
      photo: "../../assets/images/ManaJathiratnalu.jpg",
      color: "linear-gradient(150deg,#3a6d68, #213432, #000)",
      title: 'Mana Jathiratnalu (From "Jathi Ratnalu")',
      artist: 'Rahul Sipligunj, Nakash Aziz',
      lyrics_color: "#008654",
      fav: false,
      lyrics: "శూ శూదు హెరొలు<br>ఓత్తి భుద్దర ఖానులు <br>వలుఎ ళెని వజ్రాలు<br>ంఅన ఝాథి ఋఅథ్నాలు<br>ఏఎ శుత్తు ఫధూల్లు <br>ళెరె ఈత్లాంతొల్లు<br>వీల్లైనా ఫుత్తాలంతె ఈంకొ వంధెల్లు<br>శతెల్లితె ఖైనా ఛిక్కరు <br>వీల్లొ ఘుల్ల్య్ ఋఒచ్కెత్లు<br>డైల్య్ భిల్లుగతెస్ ఖి ంఒక్కె వీల్లై ఛిల్లుల ఫొచ్కెత్లు<br>శుద్ధాపూసలు శొంతె ంఆతలు <br>ఠిందికి ఠిమ్మ ఋఆజులు<br>ఫంతె ళెవరు, ళెస్థె ఆఅగరు <br>ఫనికి ఫొథరాజులు<br>శూ శూదు హెరొలు<br>ఓత్తి భుద్దర ఖానులు <br>వలుఎ ళెని వజ్రాలు"
    },
    {
      url: "../../assets/audio/MasterRaid.mp3",
      photo: "../../assets/images/master.jpeg",
      color: "linear-gradient(150deg,#6d1b0d, #311511, #000)",
      title: 'Master Raid',
      artist: 'Anirudh Ravichander, Arivu',
      lyrics_color: "#f3281b",
      fav: false,
      lyrics: "A Aa E Ee Raa<br>Apnaa Time Raa<br>Nippu Navvutho<br>Ride-U Start-U Raa<br>A Aa E Ee Raa<br> Apnaa Time Raa<br>Ride-U Start-U Ra<br>World Standard Ee Local Master<br>Line Dhaati Muttukunte<br> Okkatichhi Pamputhaadu<br>Chattamunnachotu Idhi<br> Life-U Maarche Home-U<br>Lonakochhi Thappu Chesthe<br> Master Ride Come<br>Master Ride-U, Master Ride-U<br> Master Ride-U<br>Master, Manchi Daari Korukunte Chooputhaadu<br>Vachhi Master Wanted Gaa<br> Wrong-U Cheiku Oppukodu<br>Idhi Master Ride-U, Master Ride-U<br> Master Ride-U<br>Master Ride-U, Master Ride-U<br> Master Ride-U<br>"
    },
    {
      url: "../../assets/audio/HeyAbbayi.mp3",
      photo: "../../assets/images/HeyAbbayi.jpg",
      color: "linear-gradient(150deg,#626258, #31322e, #000)",
      title: 'Hey Abbayi',
      artist: 'Micky J. Meyer, Nutana Mohan, Hymath',
      lyrics_color: "#967353",
      fav: false,
      lyrics: "No No వద్దన్నా<br> నిను follow చేస్తున్నా<br>ఏదో రోజు yes అంటావని<br> ఎదురే చూస్తున్నా<br>హే పో పో పోమ్మన్నా<br> పడిగాపే కాస్తున్నా<br>Girlfriend అయ్యే moment కోసం ప్లానే వేస్తున్నా<br>Sorry అన్నా క్షమిస్తానా<br> నే వింటానా వస్తా ఏమైనా<br><br>Hey అబ్బాయి <br>హే Hey అబ్బాయి<br>ఇంకా ఫోజులు చాలోయి<br> కాస్తా ఇటేపు చూడోయి<br>హేయ్ అబ్బాయి<br> హే హేయ్ అబ్బాయి<br>సిగ్గేంటోయ్ అబ్బాయి<br> నీకే ముద్దోటిచ్చి పోగొట్టెయ్ నా<br><br>హేయ్ అబ్బాయి<br> హే హేయ్ అబ్బాయి<br>నేను చూస్తున్నా పరువే తీసేస్తున్నా<br>పోనీ పాపం అమ్మాయంటు వదిలేస్తూఉన్నా<br>నీదే తప్పున్నా<br> ఇన్నాళ్ళు తగ్గున్నా<br>పడనే నేను వదిలేయ్ నన్ను<br> ఆపేయ్ అంటున్నా<br>నువ్వేమన్నా వస్తానన్నా<br> నే వింటానా బుద్దిగా ఆగమ్మా<br><br>హేయ్ అమ్మాయి<br> హే హేయ్ అమ్మాయి<br>ఆపేసెయ్ గోలంటూ<br> ఇంకా ఎలాగ చెప్పాలి<br>హేయ్ అమ్మాయి<br> హే హేయ్ అమ్మాయి<br>ఓ మీదేపడిపోయి ఇట్టా కలరింగ్ ఇస్తే<br> కట్ చేసెయ్ నా<br><br>తెగ ప్రేమే ఉన్నా నీ పైన<br> చీపయ్యానా<br>తొలిచూపుల్లోనే మనసు నీదే తెలుసుకున్నా <br><br>ఇక అప్పట్నుంచే… ఏమైనా నీతో ఉన్నా<br>ఒక నిన్నే నిన్నే తగిన జోడనే ఊహిస్తున్న<br>నేడని రేపని ఎంతకాలమే అయినా<br>ఏదీ చూడక ఒక్కమాటపై నేనున్నా<br>అయినా నీకిది అర్థమైననూ కాకున్నా<br>అసలే నిన్ను వదిలేపోను<br> నీతోపాటే నేనుంటా, హేయ్<br><br>హేయ్ అబ్బాయి హే హేయ్ అబ్బాయి<br>ఇంకా ఫోజులు చాలోయి<br> కాస్తా ఇటేపు చూడోయి<br>హేయ్ అబ్బాయి<br> హే హేయ్ అబ్బాయి<br>సిగ్గేంటోయ్ అబ్బాయి<br> నీకే ముద్దోటిచ్చి పోగొట్టెయ్ నా"
    },
    {
      url: "../../assets/audio/Chellamma.mp3",
      photo: "../../assets/images/chellama.jpg",
      color: "linear-gradient(150deg,#4e493b, #272621, #000)",
      title: 'Chellamma (From "Doctor")',
      artist: 'Anirudh Ravichander, Jonita Gandhi',
      lyrics_color: "#9e792b",
      fav: false,
      lyrics: "இனிமே tiktok எல்லாம் இங்க ஃபேன்ம்மா <br>நேரா டூயட் பாட வாயேன்ம்மா<br>ரொம்ப ஸ்ட்ரிக்ட்டா இருந்ததெல்லாம் போதும்மா<br>கொஞ்சம் ஸ்வீட்டா சிரிச்சு பேசேம்மா<br><br>செல்லம்மா செல்லம்மா<br>அங்கம் மின்னும் தங்கம்மா<br>பொன்னம்மா மெல்லம்மா கட்டி கிள்ளேன்மா<br>கண்ணம்மா கண்ணம்மா<br>கண்ணு ரெண்டும் கன் அம்மா<br>கொஞ்சம்மா கொஞ்சிம்மா சுட்டு தள்ளேன்ம்மா<br><br>பொல்லாத வயச சீண்டித்தான் போனாயே<br>தடுத்தாலும் உனக்கே விழுவேன் நானே<br><br>கண்ணாடி மனச கல் வீசி பார்த்தாயே<br>ஒடஞ்சாலும் காட்டுவேன் உன்ன நானே<br><br>மெழுகு டால்லு நீ அழகு ஸ்கூல்லு நீ<br>எனக்கு ஏத்தவ நீதான்டி<br><br>ஹன்ட்சம் ஆளு நீ சூப்பர் கூழு நீ<br>நானும் நீயும்தான் செம ஜோடி<br><br>பொதுவா தோனி போல நானும் காம் மும்மா<br>இன்னைக்கு எக்ஸ்சைட்மென்ட் ஆனேன்ம்மா<br>கண்ணால் வளைய வீசி என்ன தூக்குமா<br>லைப் டைம் செட்டில்மென்ட் நான்தான்ம்மா<br><br>இனிமே டிக் டாக் எல்லாம் இங்க ஃபேன்ம்மா<br>நேரா டூயட் பாட வாயேன்ம்மா<br>ரொம்ப ஸ்ட்ரிக்ட்டா இருந்ததெல்லாம் போதும்மா<br>கொஞ்சம் ஸ்வீட்டா சிரிச்சு பேசேம்மா<br>"
    }
  ]

  search_array = this.orginal_array;

  audioEvents = [
    "ended",
    "error",
    "play",
    "playing",
    "pause",
    "timeupdate",
    "canplay",
    "loadedmetadata",
    "loadstart"
  ];

  // Song handler and events

  streamObserve(url: any) {
    return new Observable(observer => {
      // console.log(url)
      this.audio.src = url;
      this.audio.load();
      this.audio.play();

      const handler = (event: Event) => {
        // console.log(event);
        if (event.type == "ended") {
          console.log("Completed");
          console.log(this.audioFile[0]);
          let ele: any = this.audioFile.find(element => element.url == url);
          let i = this.audioFile.indexOf(ele, 0);
          // console.log(i);
          this.nextSong(i);
        }
        this.seek = this.audio.currentTime;
        this.currentTime = this.timeFormat(this.audio.currentTime, "mm:ss");
        this.durationseek = this.audio.duration;
        this.durationTime = this.timeFormat(this.audio.duration, "mm:ss");
      }
      this.addEvent(this.audio, this.audioEvents, handler);

      return () => {
        this.audio.pause();
        this.audio.currentTime = 0;
        console.log("Song ended");
        this.removeEvent(this.audio, this.audioEvents, handler);
      }
    });
  }

  addEvent(obj: any, events: any, handler: any) {
    events.forEach((event: any) => {
      obj.addEventListener(event, handler);
    });
  }

  removeEvent(obj: any, events: any, handler: any) {
    events.forEach((event: any) => {
      obj.removeEventListener(event, handler);
    });
  }

  // Play, pause, skip songs

  playPause(state: any, url: any) {
    if (!this.start) {
      this.streamObserve(url).subscribe((event: any) => { });
      this.start = true;
      this.play = !this.play;
    }
    else {
      if (state) {
        this.audio.play();
        this.play = !this.play;
      }
      else {
        this.audio.pause();
        this.play = !this.play;
      }
    }
  }

  timeChange(e: any) {
    this.audio.currentTime = e.value;
    console.log(e.value);
  }

  volumeChange(e: any) {
    //mat-slide value
    this.audio.volume = e.value
  }

  timeFormat(time: any, format: any) {
    const momentTime = time * 1000;
    return moment.utc(momentTime).format(format);
  }

  previousSong(i: any) {
    if (!this.repeatLoop) {
      if (i == 0) {
        this.play = false;
        this.start = false;
      }
      else {
        this.j = i - 1;
      }
    }
    else {
      if (i == 0) {
        this.j = this.audioFile.length - 1;
      }
      else {
        this.j = i - 1;
      }
    }
    this.play = true;
    this.start = false;
    this.currentTime = "0:00";
    this.durationTime = "0:00";
    this.playPause(this.play, this.audioFile[this.j].url)
  }

  // randomGenertor(i: any) {
  //   const rd = Math.floor(Math.random() * this.audioFile.length) + 1;
  //   const ele = (i + rd) % this.audioFile.length;
  //   return ele;
  // }

  nextSong(i: any) {
    if (!this.repeatLoop) {
      if (i + 1 == this.audioFile.length) {
        this.j = 0;
      }
      else {
        this.j = i + 1;
      }
    }
    else {
      if (i + 1 == this.audioFile.length) {
        this.j = 0;
      }
      else {
        this.j = i + 1;
      }
    }
    this.play = true;
    this.start = false;
    this.currentTime = "0:00";
    this.durationTime = "0:00";
    this.playPause(this.play, this.audioFile[this.j].url)
    if (this.j == 0 && !this.repeatLoop) {
      this.audio.pause();
      this.play = !this.play
    }
  }

  playlistSongChange(i: any) {
    this.j = i;
    this.play = true;
    this.start = false;
    this.currentTime = "0:00";
    this.durationTime = "0:00";
    this.playPause(this.play, this.audioFile[this.j].url)
  }

  shuffle() {
    this.shufflePlay = !this.shufflePlay;
    if (this.shufflePlay) {
      let temp_url = this.audioFile[this.j].url;
      this.shufflePlaylist(this.audioFile);
      let ele: any = this.audioFile.find(element => element.url == temp_url);
      let i = this.audioFile.indexOf(ele, 0);
      let temp = this.audioFile[i];
      this.audioFile[i] = this.audioFile[this.j];
      this.audioFile[this.j] = temp;
      // this.j = i;
      console.log("Shuffle", this.audioFile)
    }
    else {
      let temp_url = this.audioFile[this.j].url;
      console.log("Original", this.orginal_array);
      this.audioFile = [];
      console.log("Empty", this.audioFile);
      for (let i of this.orginal_array) {
        this.audioFile.push(i);
      }
      let ele: any = this.audioFile.find(element => element.url == temp_url);
      let i = this.audioFile.indexOf(ele, 0);
      this.j = i;
      console.log("UnShuffle", this.audioFile)
    }
  }

  shufflePlaylist(array: any) {
    var currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  // Drag and Drop

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.audioFile, event.previousIndex, event.currentIndex);
    console.log(this.audioFile);
  }

  searchValue: any = '';

  search(e: any) {
    this.search_array = [];
    for (let word = 0; word < this.orginal_array.length; word++) {
      let str = this.orginal_array[word].title.toLowerCase();
      for (let i = 0; i < str.length; i++) {
        for (let j = i; j < str.length; j++) {
          // console.log("string", str.substring(i,j));
          if (str.substring(i, j) == this.searchValue) {
            if (this.search_array.indexOf(this.orginal_array[word]) == -1) {
              this.search_array.push(this.orginal_array[word]);
            }
          }
        }
      }
    }
  }

  getFavSongNum() {
    let num = 0;
    for (let i of this.audioFile) {
      if (i.fav) {
        num += 1;
      }
    }
    return num
  }

  addToFav(i: any) {
    this.audioFile[i].fav = !this.audioFile[i].fav;
    if (this.audioFile[i].fav) {
      this.openSnackBar('Added to Liked Songs.')
    }
    else {
      this.openSnackBar('Removed from Liked Songs.')
    }
  }

  openSnackBar(message: any) {
    this.snackBar.open(message, '', { duration: 2000 }
    );
  }

  playlistSongs:any = []
  playlistSongTitle:any;

  getPlaylist(title:any){  
    this.playlistSongs.splice(0, this.playlistSongs.length)
    for(let i of this.audioFile){
      if(i.fav){
        this.playlistSongs.push(i);
      }
    }
    if(title!='' && this.playlistSongs.length!=0){
      this.screen_libraryPlaylist=true;
      this.playlistSongTitle = title;
    }   
  }


  wishAccTime() {
    let todaysDataTime = formatDate(this.now, 'HH:mm', 'en-US', '+0530');
    if (todaysDataTime < '12:00' && todaysDataTime >= '04:00') {
      return "Good morning";
    }
    else if (todaysDataTime < '17:00' && todaysDataTime >= '12:00') {
      return "Good afternoon";
    }
    else {
      return "Good evening";
    }

  }

  powerOff: any = false;

  batteryCheck() {
    if (this.battery < 1) {
      this.audio.pause();
      this.powerOff = true;
      if (this.battery < -1) {
        this.powerOff = false;
      }

      return false
    }
    else {
      return true
    }
  }

  public now: Date = new Date();

  battery: any = 99;

  rn: number = 10;

  constructor(private snackBar: MatSnackBar) {
    setInterval(() => {
      this.now = new Date();
    }, 1);
    setInterval(() => {
      this.battery = this.battery - 1;
      this.rn = 50;
      // console.log(this.rn)
      if (this.battery < 1) {
        this.rn = 50
      }
    }, (this.rn * 1000));

  }


  ngOnInit(): void {
    // let ex = this.wishAccTime();
    // console.log(ex);
  }

}
