package com.example.Player;

import java.io.IOException;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import net.bramp.ffmpeg.FFmpeg;
import net.bramp.ffmpeg.FFmpegExecutor;
import net.bramp.ffmpeg.FFprobe;
import net.bramp.ffmpeg.builder.FFmpegBuilder;
import net.bramp.ffmpeg.probe.FFmpegFormat;
import net.bramp.ffmpeg.probe.FFmpegProbeResult;
import net.bramp.ffmpeg.probe.FFmpegStream;

@SpringBootApplication
public class PlayerApplication {

	public static void main(String[] args) {
//  SpringApplication.run(PlayerApplication.class, args);
		
	String filepath="C:/Users/anpanthri/Desktop/vids/6_9.1/test/car.mov";
 		getVideoInfo(filepath);
		
 //	convertVideo(filepath);
		
		
		
	}

	private static void getVideoInfo(String filepath) {
		FFprobe ffprobe = null;
		try {
			ffprobe = new FFprobe("C:/ffmpeg/bin/ffprobe");
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		FFmpegProbeResult probeResult = null;
		try {
			probeResult = ffprobe.probe(filepath);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		FFmpegFormat format = probeResult.getFormat();
		System.out.format("%nFile: '%s' ; Format: '%s' ; Duration: %.3fs; BITRate: %s,", 
			format.filename, 
			format.format_long_name,
			format.duration,
			format.bit_rate
		);

		FFmpegStream stream = probeResult.getStreams().get(0);
		System.out.format("%nCodec: '%s' ; Width: %dpx ; Height: %dpx",
			stream.codec_long_name,
			stream.width,
			stream.height
		);
		
	}

	private static void convertVideo(String filepath) {
		Long stime=System.nanoTime();
		FFmpeg ffmpeg = null;
		try {
			ffmpeg = new FFmpeg("C:/ffmpeg/bin/ffmpeg");
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		FFprobe ffprobe =null;
		try {
			ffprobe = new FFprobe("C:/ffmpeg/bin/ffprobe");
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		FFmpegBuilder builder = new FFmpegBuilder()

		  .setInput(filepath)    // Filename, or a FFmpegProbeResult
		  .overrideOutputFiles(true) // Override the output if it exists

		  .addOutput("C:/Users/anpanthri/Desktop/vids/6_9.1/test/new_car_mp.mp4")   // Filename for the destination
		    .setFormat("mp4")        // Format is inferred from filename, or can be set
		      // Aim for a 250KB file

		    .disableSubtitle()       // No subtiles
		  //  .disableAudio()
		    
		   .setAudioChannels(1)         // Mono audio
		    .setAudioCodec("aac")        // using the aac codec
		    .setAudioSampleRate(48_000)  // at 48KHz
		    .setAudioBitRate(32768)      // at 32 kbit/s
		  
		    .setVideoCodec("libx264")     // Video using x264
		    .setVideoFrameRate(40)     // at 24 frames per second
		    //.setVideoResolution(3360, 2100) // at 640x480 resolution this is imp
		    .setVideoResolution(1280,720)
		    .setVideoBitRate(1556462)  //40000000 this is also imp

		    .setStrict(FFmpegBuilder.Strict.EXPERIMENTAL) // Allow FFmpeg to use experimental specs
		    .done();

		FFmpegExecutor executor = new FFmpegExecutor(ffmpeg, ffprobe);

		// Run a one-pass encode
		executor.createJob(builder).run();

		// Or run a two-pass encode (which is slower at the cost of better quality)
		executor.createTwoPassJob(builder).run();
		Long etime=System.nanoTime();
		System.out.println("TIME TAKEN FOR CONVERSION IS:"+(etime-stime)/1000000000);
		
	}
}
