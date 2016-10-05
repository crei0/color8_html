/* 

	color8
		
		Versão Portuguesa 1.1
		29-05-2011
		
        Criado por
            André Guedes
            http://andreguedes.pt/
            guedes.andre@gmail.com

		Licença
			Atribuição - Uso Não Comercial - Partilha nos Mesmos Termos 3.0 Não Adaptada (CC BY-NC-SA 3.0) 
            http://creativecommons.org/licenses/by-nc-sa/3.0/deed.pt
                
				Tem o direito de:
					Partilhar — copiar, distribuir e transmitir a obra
					Remisturar — adaptar a obra
				
				De acordo com as seguintes condições:
                	Atribuição — Tem de fazer a atribuição da obra, da maneira estabelecida pelo autor ou licenciante 
					(mas sem sugerir que este o apoia, ou que subscreve o seu uso da obra).
					
					Uso Não Comercial — Não pode usar esta obra para fins comerciais.
					
					Partilha nos Mesmos Termos — Se alterar, transformar, ou adaptar esta obra, ou se a utilizar noutras obras, 
					só pode distribuir a obra resultante licenciando-a com a mesma licença ou com uma licença semelhante a esta.
						
*/

var rgb = "0, 0, 0";
	var red = "0";
	var green = "0";
	var blue = "0";
var hsb = "0, 0, 0";
	var hue = "0";
	var saturation = "0";
	var brightness = "0";
var hue_rgb = "0";
var saturation_rgb = "0";
var brightness_rgb = "0";
var hex = "#000000";

var list = null;
window.addEvent('domready', function(){
/* RGB sliders */
	/* Slider Red */
	var mySlideRed = new Slider($('slider_red'), $('knob_red'), {
		offset: 6, steps: 255, 
		onChange: function(step){
			red = step;
			update_sliders();
		}
	}).set(0);

	/* Slider Green */
	var mySlideGreen = new Slider($('slider_green'), $('knob_green'), {
		offset: 6, steps: 255, 
		onChange: function(step){
			green = step;
			update_sliders();
		}
	}).set(0);

	/* Slider Blue */
	var mySlideBlue = new Slider($('slider_blue'), $('knob_blue'), {
		offset: 6, steps: 255, 
		onChange: function(step){
			blue = step;
			update_sliders();
		}
	}).set(0);
	
/* hsb sliders */
	/* Slider Hue */
	var mySlideHue = new Slider($('slider_hue'), $('knob_hue'), {
		offset: 6, steps: 360, 
		onChange: function(step){
			hue = step;
			update_sliders();
		}
	}).set(0);

	/* Slider Saturation */
	var mySlideSaturation = new Slider($('slider_saturation'), $('knob_saturation'), {
		offset: 6, steps: 100, 
		onChange: function(step){
			saturation = step;
			//saturation_rgb = [hue,saturation,100].hsbToRgb();
			update_sliders();
		}
	}).set(0);

	/* Slider brightness */
	var mySlidebrightness = new Slider($('slider_brightness'), $('knob_brightness'), {
		offset: 6, steps: 100, 
		onChange: function(step){
			brightness = step;
			//brightness_rgb = [hue,saturation,brightness].hsbToRgb();
			update_sliders();
		}
	}).set(0);
	
	show_rgb();
	
	random_color();
	/* var tooltips = new Tips($$('.tooltip'), { 
		className: 'custom', 
		fixed: true,
		offsets: {'x': -195, 'y': -2}, 
		showDelay: 0,
		hideDelay: 0,
	});*/
}); 

function update_sliders(){
	if ($('rgb_sliders').style.display == "block") {
		rgb = red + "," + green + "," + blue;
		hsb = [red,green,blue].rgbToHsb();
		
		hue = hsb[0];
		saturation = hsb[1];
		brightness = hsb[2];
	}
	if ($('hsb_sliders').style.display == "block") {
		hsb = hue + "," + saturation + "," + brightness;		
		rgb = [hue,saturation,brightness].hsbToRgb();
		
		red = rgb[0];
		green = rgb[1];
		blue = rgb[2];
	}
	hex = ("rgb(" + rgb + ")").rgbToHex();	
	
	hue_rgb = [hue,100,100].hsbToRgb();
	saturation_rgb = [hue,saturation,100].hsbToRgb();
	brightness_rgb = [hue,saturation,brightness].hsbToRgb();
	
	$('color_rgb').value = rgb;
	$('color_hsb').value = hsb;
	$('color_hex').value = hex;

	$('stats_red').innerHTML = red;
	$('stats_green').innerHTML = green;
	$('stats_blue').innerHTML = blue;
	$('stats_hue').innerHTML = hue;
	$('stats_saturation').innerHTML = saturation;
	$('stats_brightness').innerHTML = brightness;
	
	$('stats_saturation').style.backgroundColor = "rgb(" + hue_rgb + ")";
	$('stats_brightness').style.backgroundColor = "rgb(" + saturation_rgb + ")";

	// rgb knob's position
	$('knob_red').style.left = red - 6;
	$('knob_green').style.left = green - 6;
	$('knob_blue').style.left = blue - 6;
	// hsb knob's position
	$('knob_hue').style.left = hue / 1.40625 -6 ;
	$('knob_saturation').style.left = saturation * 2.56 - 6;
	$('knob_brightness').style.left = brightness * 2.56 - 6;

	// knob's background color
	$('knob_red').style.backgroundColor = "rgb(" + red + ", 0, 0)";
	$('knob_green').style.backgroundColor = "rgb(0, " + green + ", 0)";
	$('knob_blue').style.backgroundColor = "rgb(0, 0, " + blue + ")";
	$('knob_hue').style.backgroundColor = "rgb(" + hue_rgb + ")";
	$('knob_saturation').style.backgroundColor = "rgb(" + saturation_rgb + ")";
	$('knob_brightness').style.backgroundColor = "rgb(" + brightness_rgb + ")";

	$('slider_hue').style.backgroundColor = "rgb(" + hue_rgb + ")";
	$('slider_saturation').style.backgroundColor = "rgb(" + hue_rgb + ")";
	$('slider_brightness').style.backgroundColor = "rgb(" + saturation_rgb + ")";
	
	// color box
	$('color').style.backgroundColor = "rgb(" + rgb + ")";

/* removed for now
	//cmyk - based on http://www.easyrgb.com/math.php
		c = 1 - (red / 255);
		m = 1 - (green / 255);
		y = 1 - (blue / 255);
		var_k = 1;
		if (c < var_k) { var_k = c; }
		if (m < var_k) { var_k = m; }
		if (y < var_k) { var_k = y; }
		if (var_k == 1 ) {
		   c = 0;
		   m = 0;
		   y = 0;
		} else {
		   c = (c - var_k ) / ( 1 - var_k );
		   m = (m - var_k ) / ( 1 - var_k );
		   y = (y - var_k ) / ( 1 - var_k );
		}
		k = var_k;
		c = Math.round(c * 10000) / 10000;
		m = Math.round(m * 10000) / 10000;
		y = Math.round(y * 10000) / 10000;
		k = Math.round(k * 10000) / 10000;
		cmyk = c + ", " + m + ", " + y + ", " + k;

	$('color_cmyk').setHTML(cmyk);
*/
}

function show_rgb(){
	$('rgb_sliders').style.display = "block";
	$('hsb_sliders').style.display = "none";
	$('rgb_sliders').style.display = "block";
	$('show_rgb').className = "selected";
	$('show_hsb').className = "";
}
function show_hsb(){
	$('rgb_sliders').style.display = "none";
	$('hsb_sliders').style.display = "block";
	$('show_rgb').className = "";
	$('show_hsb').className = "selected";
}

function show_info(){
		$('color_container').style.display = "none";
		$('info_container').style.display = "block";
}
function hide_info(){
		$('info_container').style.display = "none";
		$('color_container').style.display = "block";
}

function open_url_in_browser(url){
	request = new air.URLRequest(url);          
	air.navigateToURL(request);
}

function random_color(){
	red = Math.floor(Math.random()*257);
	green = Math.floor(Math.random()*257);
	blue = Math.floor(Math.random()*257);
	
	hsb = [red,green,blue].rgbToHsb();
		
	hue = hsb[0];
	saturation = hsb[1];
	brightness = hsb[2];

	update_sliders();
}

function select_input_text(id){
	$(id).selectionStart = 0;
	$(id).selectionEnd = $(target).textLength;
}

function copyTextToClipboard(id) {
	text = $(id).value;
	list = new runtime.Array();
	list.push(text);
	
	air.ClipboardManager.accessClipboard(justCopyIt);
}
function justCopyIt() {
	var transfer = new air.TransferableData();
	transfer.addData( list, air.TransferableFormats.TEXT_FORMAT, true );
	air.ClipboardManager.data = transfer;
}

/*
// code not working correctly
function increase(who){
	if ((who >= 0) & (who < 360)) {
		if (who = "red") {
			if (red < 255){ red++; }			
		} else if (who = "blue"){
			if (blue < 255){ blue++; }
		} else if (who = "green"){
			if (green < 255){ green++; }
		} else if (who = "saturation"){
			if (green < 100){ saturation++; }
		} else if (who = "brightness"){
			if (brightness < 100){ brightness++; }
		} else if (who = "hue"){
			if (hue < 360){ hue++; }
		}
	}
	update_sliders();
}
// code not working correctly
function decrease(whom){
	if ((whom > 0) & (whom < 360)) {
		if (whom == "red") {
			if (red < 255){ red--; }			
		}
		if (whom == "blue"){
			if (blue < 255){ blue--; }
		}
		if (whom == "green"){
			if (green < 255){ green--; }
		}
		if (whom == "saturation"){
			if (green < 100){ saturation--; }
		}
		if (whom == "brightness"){
			if (brightness < 100){ brightness--; }
		}
		if (whom == "hue"){
			hue--;
		}
	}
	update_sliders();
}*/