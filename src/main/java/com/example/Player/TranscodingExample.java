package com.example.Player;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;

public class TranscodingExample {

	
	 public static void main(String[] args) throws IOException {
		 File wd = new File("C:/Users/anpanthri/Desktop/vids");
		 Process p=Runtime.getRuntime().exec("c:/ffmpeg/ -i c:/ffmpeg/bin/test_m.mov -codec:v libx264 -vf scale=480:-1 -y c:/ffmpeg/bin/output.mp4");/*;c:\ffmpeg\ -i c:\ffmpeg\bin\input.mp4 -codec:v libx264 -vf scale=480:-1 -y c:\ffmpeg\bin\output.mp4*/
		 BufferedReader br = new BufferedReader(new InputStreamReader(p.getInputStream()));
		 String line ="";
		 while((line=br.readLine())!=null)
			 System.out.println(line);
		 
	 }

	}

