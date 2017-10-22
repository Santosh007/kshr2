package com.catchup.app;

import java.io.IOException;
import java.util.HashMap;

import javax.websocket.CloseReason;
import javax.websocket.EncodeException;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;

import org.apache.log4j.Logger;

import com.catchup.carrier.Message;
import com.catchup.handler.MessageEncoder;
import com.catchup.handler.ParseMessage;

@ServerEndpoint(value="/{user}",encoders=MessageEncoder.class,decoders=ParseMessage.class)
public class CatchupEndpoint{
	private static Logger logger = Logger.getLogger(CatchupEndpoint.class);
	private static HashMap<String, Session> sessions = new HashMap<String,Session>();
	
	@OnOpen
	public void joinConversation(Session session,@PathParam("user") String user){
		logger.info("--is session open"+session.isOpen());
		logger.info("--is session secure"+session.isSecure());
		logger.debug("Connection created successfully");
		session.getUserProperties().put("user", user);
		logger.info("Max idle timeout"+session.getMaxIdleTimeout());
		sessions.put(user, session);
	}
	
	@OnMessage
	public void messageRecieved(Session session,Message message){
		try {
			for(String user: sessions.keySet()){
				if(!user.equals(session.getUserProperties().get("user").toString())){
					if(sessions.get(user).isOpen()){
					 sessions.get(user).getBasicRemote().sendObject(message);
					}else{
						sessions.remove(user);
					}
				}
			}
			//session.getBasicRemote().sendText(message);
		} catch (IOException e) {
			logger.error("OnMessage methode thrown error"+e.getMessage());
		} catch (EncodeException e) {
			logger.error("Message encode thrown error"+e.getMessage());
		}
		logger.debug("Total active connections "+sessions.size());
	}
	
	@OnClose
	public void  leaveConversation(Session session, 
            CloseReason reason){
		/*if(session.isOpen()){
			try {
				session.close();
			} catch (IOException e) {
				logger.error("Session close failed"+e.getMessage());
				//e.printStackTrace();
			}
		}*/
	sessions.remove(session.getUserProperties().get("user").toString());
	logger.info("Session closed with reason "+reason);
	}
	
	@OnError
	public void conversationInterrupted(Session session, 
            Throwable error){
		sessions.remove(session.getUserProperties().get("user").toString());
		logger.error("Connection interrupted "+error.getMessage());
	}

}
