package com.catchup.handler;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import com.catchup.app.CatchupEndpoint;
import com.catchup.carrier.Buddy;

public class BuddyFinder {
	
	public List<Buddy> getAllBuddies(){
		Set<String> vals = CatchupEndpoint.getAll();
		List<Buddy> buddies = new ArrayList<Buddy>();
		for(String val : vals){
			Buddy buddy = new Buddy();
			buddy.setName(val);
			buddies.add(buddy);
		}
		return buddies;
	}

}
