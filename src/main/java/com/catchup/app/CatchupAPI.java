package com.catchup.app;

import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.catchup.carrier.Buddy;
import com.catchup.handler.BuddyFinder;

@Path("/buddies")
public class CatchupAPI{
	
	@GET
	@Produces(MediaType.APPLICATION_XML)
	public Response getAllBuddies(){
		BuddyFinder finder = new BuddyFinder();
		List<Buddy> buddies = finder.getAllBuddies();
		GenericEntity<List<Buddy>> buddiesEntity = new GenericEntity<List<Buddy>>(buddies){};
		return Response.ok(buddiesEntity).build();
	}

}
