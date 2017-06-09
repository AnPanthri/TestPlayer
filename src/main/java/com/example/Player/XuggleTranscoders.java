package com.example.Player;

import com.xuggle.mediatool.IMediaReader;
import com.xuggle.mediatool.IMediaWriter;
import com.xuggle.mediatool.ToolFactory;
import com.xuggle.xuggler.ICodec;
import com.xuggle.xuggler.IContainer;
import com.xuggle.xuggler.IContainerFormat;

public class XuggleTranscoders {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		  long startTime = System.nanoTime();
		String inputFilename ="C:/Users/anpanthri/Desktop/vids/6_6/test_m.mov";
		   String Trans_OutputFilename ="C:/Users/anpanthri/Desktop/vids/6_6/new_trans_test.mp4";
		  IMediaReader mediaReader = ToolFactory.makeReader(inputFilename);
		  IMediaWriter mediaWriter = ToolFactory.makeWriter(Trans_OutputFilename,
		            mediaReader);
		    mediaReader.addListener(mediaWriter);
		    while (mediaReader.readPacket() == null)
		        ;
		    
		   /* IMediaReader reader = ToolFactory.makeReader(inputFilename);
		    IMediaWriter writer = ToolFactory.makeWriter(Trans_OutputFilename, reader);
		    writer.open();
		    writer.setForceInterleave(true);
		    IContainerFormat outFormat = IContainerFormat.make();
		    outFormat.setOutputFormat("mp4", Trans_OutputFilename, null);
		    IContainer container = writer.getContainer();
		    container.open(Trans_OutputFilename, IContainer.Type.WRITE, outFormat);
		    writer.addVideoStream(0, 0, ICodec.ID.CODEC_ID_MPEG4, 1920, 1080);
		 //   writer.addAudioStream(1, 0, ICodec.findEncodingCodecByName("mp3"), 0, 0);
		    reader.addListener(writer);
		    while (reader.readPacket() == null);*/
		  
		    
		    long endTime = System.nanoTime();
		    System.out.println("Time taken for conversion"+(startTime-endTime));
		
	}

}
