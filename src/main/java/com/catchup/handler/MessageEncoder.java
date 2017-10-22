/**
 * 
 */
package com.catchup.handler;

import javax.json.Json;
import javax.websocket.EncodeException;
import javax.websocket.Encoder;
import javax.websocket.EndpointConfig;

import org.apache.log4j.Logger;

import com.catchup.carrier.Message;

/**
 * @author Santosh
 *
 */
public class MessageEncoder implements Encoder.Text<Message>{
	final static Logger logger = Logger.getLogger(MessageEncoder.class);

	public void destroy() {
		// TODO Auto-generated method stub
		
	}

	public void init(EndpointConfig arg0) {
		// TODO Auto-generated method stub
		
	}

	public String encode(Message message) throws EncodeException {
		logger.debug("Inside message encoder.");
		return Json.createObjectBuilder().add("content", message.getMessageContent())
		.add("sender", message.getMessageSender())
		.add("received", message.getMessageReceivedAt())
		.add("rcontent", message.getrContent())
		.add("rsender", message.getrSender())
		.add("rreceived", message.getrReceivedAt())
		.build().toString();
	}

	

}
