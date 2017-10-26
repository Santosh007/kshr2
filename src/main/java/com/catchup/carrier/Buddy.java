package com.catchup.carrier;

import java.io.Serializable;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Buddy implements Serializable{
	
	private String name;
	private String shortname;
	private String reknown;
	private String bio;
	
	public Buddy() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Buddy(String name, String shortname, String reknown, String bio) {
		super();
		this.name = name;
		this.shortname = shortname;
		this.reknown = reknown;
		this.bio = bio;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getShortname() {
		return shortname;
	}
	public void setShortname(String shortname) {
		this.shortname = shortname;
	}
	public String getReknown() {
		return reknown;
	}
	public void setReknown(String reknown) {
		this.reknown = reknown;
	}
	public String getBio() {
		return bio;
	}
	public void setBio(String bio) {
		this.bio = bio;
	}
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((bio == null) ? 0 : bio.hashCode());
		result = prime * result + ((name == null) ? 0 : name.hashCode());
		result = prime * result + ((reknown == null) ? 0 : reknown.hashCode());
		result = prime * result + ((shortname == null) ? 0 : shortname.hashCode());
		return result;
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Buddy other = (Buddy) obj;
		if (bio == null) {
			if (other.bio != null)
				return false;
		} else if (!bio.equals(other.bio))
			return false;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		if (reknown == null) {
			if (other.reknown != null)
				return false;
		} else if (!reknown.equals(other.reknown))
			return false;
		if (shortname == null) {
			if (other.shortname != null)
				return false;
		} else if (!shortname.equals(other.shortname))
			return false;
		return true;
	}
	@Override
	public String toString() {
		return "Buddy [name=" + name + ", shortname=" + shortname + ", reknown=" + reknown + ", bio=" + bio + "]";
	}
}
