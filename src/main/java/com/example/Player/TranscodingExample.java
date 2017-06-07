package com.example.Player;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;

public class TranscodingExample {

	
	 public static void main(String[] args) throws IOException {
		// String cmd="C:/ffmpeg/ffmpeg.exe -i test_m.mov test_m1234.mp4";
		 String cmd[] = {"C:\\ffmpeg\\bin\\ffmpeg","-i","C:\\Users\\anpanthri\\Desktop\\vids\\test_m.mov","C:\\Users\\anpanthri\\Desktop\\vids\\testinglk.mp4"};
		 File wd = new File("C:/Users/anpanthri/Desktop/vids");
		  String[] cmdArray = new String[2];
	      cmdArray[0] = "ffmpeg";
	     cmdArray[1] = "example.txt";
	    Long stime=System.nanoTime();
		 
		 Process p=Runtime.getRuntime().exec(" C:\\ffmpeg\\bin\\ffmpeg -i C:\\Users\\anpanthri\\Desktop\\vids\\final1.mp4 C:\\Users\\anpanthri\\Desktop\\vids\\reap.mov");//c:\ffmpeg\ -i c:\ffmpeg\bin\input.mp4 -codec:v libx264 -vf scale=480:-1 -y c:\ffmpeg\bin\output.mp4
		 /*BufferedReader br = new BufferedReader(new InputStreamReader(p.getInputStream()));
		 while( br.readLine() !=null)
			 System.out.println(br.readLine());
		 Long etime=System.nanoTime();
		 System.out.println(stime-etime);*/
	 }
	 

	}

