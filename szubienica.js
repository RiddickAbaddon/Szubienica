var haslo="";
var dlugosc=0;
var haslo1="";
var haslo2="";
var ileSkuch=0;
var dzwiek=true;
var pierwszy=true;
var yes=new Audio("snd/yes.wav");
var no=new Audio("snd/no.wav");
var przegrana=new Audio("snd/przegrana.wav");
var wygrana=new Audio("snd/wygrana.wav");
var ambient=new Audio("snd/ambient.mp3");
yes.volume=0.2;
no.volume=0.2;
wygrana.volume=0.2;
przegrana.volume=0.2;
ambient.volume=0.2;
ambient.loop=true;
var litery=new Array(35);
litery[0]="A"; litery[1]="Ą";litery[2]="B";litery[3]="C";litery[4]="Ć";litery[5]="D";litery[6]="E";
litery[7]="Ę"; litery[8]="F";litery[9]="G";litery[10]="H";litery[11]="I";litery[12]="J";litery[13]="K";
litery[14]="L"; litery[15]="Ł";litery[16]="M";litery[17]="N";litery[18]="Ń";litery[19]="O";litery[20]="Ó";
litery[21]="P"; litery[22]="Q";litery[23]="R";litery[24]="S";litery[25]="Ś";litery[26]="T";litery[27]="U";
litery[28]="V"; litery[29]="W";litery[30]="X";litery[31]="Y";litery[32]="Z";litery[33]="Ż";litery[34]="Ź";

window.onload=start;

function szyfrowanie() {
	var losuj =Math.round(Math.random()*(hasla.length-1));
	haslo=hasla[losuj];
	document.getElementById("kategoria").innerHTML=kategoria[losuj];
	dlugosc=haslo.length;
	haslo1=haslo.toUpperCase();
	haslo2="";
	for(i=0; i<dlugosc; i++) {
		if(haslo.charAt(i)==" ")haslo2=haslo2+" ";
		else haslo2=haslo2+"_";
	}
}

function zmienDzwiek() {
	if(dzwiek==true) {
		dzwiek=false;
		ambient.pause();
		document.getElementById("dzwiek").innerHTML='<i class="icon-volume-off"></i>';
	} else {
		dzwiek=true;
		ambient.play();
		yes.play();
		document.getElementById("dzwiek").innerHTML='<i class="icon-volume"></i>';
	}
}

function wypiszHaslo() {
	document.getElementById("plansza").innerHTML=haslo2;
}

function start() {
	ileSkuch=0;
	if(pierwszy==true) {
		pierwszy=false;
		ambient.play();
	}
	else if(dzwiek==true)yes.play();
	szyfrowanie();
	var trescDiva="";
	for(i=0; i<35; i++) {
		trescDiva=trescDiva+'<div class="litera" id="lit'+i+'"onclick="sprawdz('+i+')">'+litery[i]+'</div>';
	}
	trescDiva=trescDiva+'<div style="clear: both;"></div>';
	document.getElementById("alfabet").innerHTML=trescDiva;
	document.getElementById("szubienica").innerHTML='<img src="img/s0.png"/>';
	wypiszHaslo();
}

String.prototype.zmienZnak=function(miejsce, znak) {
	if(miejsce>this.length-1) return this.toString();
	else return this.substr(0, miejsce)+znak+this.substr(miejsce+1);
}

function sprawdz(nr) {
	var trafiona=false;
	for(i=0; i<dlugosc; i++) {
		if(haslo1.charAt(i)==litery[nr]) {
			haslo2=haslo2.zmienZnak(i, haslo.charAt(i));
			trafiona=true;
		}
	}
	if(trafiona==true) {
		if(dzwiek==true)yes.play();
		document.getElementById("lit"+nr).style.background="#001500"; 
		document.getElementById("lit"+nr).style.color="#00cc00"; 
		document.getElementById("lit"+nr).style.border="3px outset #00cc00"; 
		document.getElementById("lit"+nr).style.cursor="default"; 
		document.getElementById("lit"+nr).setAttribute("onclick",";");
		wypiszHaslo();
	} else {
		if(dzwiek==true)no.play();
		document.getElementById("lit"+nr).style.background="#150000"; 
		document.getElementById("lit"+nr).style.color="#cc0000"; 
		document.getElementById("lit"+nr).style.border="3px outset #cc0000"; 
		document.getElementById("lit"+nr).style.cursor="default"; 
		document.getElementById("lit"+nr).setAttribute("onclick",";");
		ileSkuch++;
		document.getElementById("szubienica").innerHTML='<img src="img/s'+ileSkuch+'.png"/>';
	}
	if(haslo2==haslo || ileSkuch>=10) {
		var info="</br></br></br>";
		if(haslo2==haslo) {
			if(dzwiek==true) wygrana.play();
			info=info+"Gratulacje! Udało ci się odgadnąć hasło ";
			if(ileSkuch==0) info=info+"bezbłędnie!";
			else {
				info=info+"popełniając "+ileSkuch;
				if(ileSkuch==1) info=info+" błąd.";
				else if(ileSkuch<5) info=info+" błędy.";
				else if(ileSkuch>4) info=info+" błędów.";
			}
		} else {
			if(dzwiek==true) przegrana.play();
			info=info+"Nie udało Ci się odgadnąć hasła. Mały chłopiec został powieszony.";
			haslo2=haslo;
			wypiszHaslo();
		}
		info=info+'</br></br><div id="przycisk" onclick="start()">Zagraj ponownie</div>';
		document.getElementById("alfabet").innerHTML=info;
	}
}