package tr.com.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import tr.com.entities.Grup;
import tr.com.service.GrupService;

@Controller
@RequestMapping("/grup")
public class GrupController {
	
	@Autowired
	private GrupService service;

	@RequestMapping(value="/getAll.ajax")
	@ResponseBody
	public void getAll(HttpServletRequest request, HttpServletResponse response) throws IOException{
		
		JSONObject obj = new JSONObject();
		JSONObject user = new JSONObject();
		JSONArray userList = new JSONArray();
		
		List<Grup> grupList = service.getAll();
		
		for (Grup grup : grupList) {
			user.put("grupId", grup.getId());
			user.put("adi", grup.getAdi());
			user.put("katsayi", grup.getKatsayi());
			userList.add(user);
		}
		
		
		obj.put("data", userList);
		obj.put("success", true);
		
		response.getWriter().write(obj.toString());
		
	}
	
	@RequestMapping(value="/saveOrUpdate.ajax")
	@ResponseBody
	public void saveOrUpdate(HttpServletRequest request, HttpServletResponse response) throws IOException{
		
		JSONObject obj = new JSONObject();
		JSONObject user = new JSONObject();
		JSONArray userArr = new JSONArray();
		
		String data = request.getParameter("data");
		JSONObject jdata = JSONObject.fromObject(data);
		Grup grup = new Grup();
		Long primId = jdata.getLong("grupId");
		
		
		grup.setAdi(jdata.getString("adi"));
		grup.setKatsayi(jdata.getDouble("katsayi"));
		if(primId != null && primId != 0L){
			grup.setId(primId);
		}
		
		service.saveOrUpdate(grup);
		
		user.put("adi", jdata.get("adi"));
		user.put("katsayi", jdata.get("katsayi"));
		
		userArr.add(user);
		
		obj.put("data", userArr);
		obj.put("success", true);
		
		response.getWriter().write(obj.toString());
		
	}
	
	@RequestMapping(value="/deleteById.ajax")
	@ResponseBody
	public void deleteById(HttpServletRequest request, HttpServletResponse response) throws IOException{
		
		JSONObject obj = new JSONObject();
		
		JSONObject jdata = JSONObject.fromObject(request.getParameter("data"));
		Grup grup = new Grup();
		Long grupId = jdata.getLong("grupId");
		
		if(grupId != null && grupId != 0L){
			grup.setId(grupId);
		}
		
		service.deleteById(grup);

		obj.put("success", true);
		
		response.getWriter().write(obj.toString());
		
	}
}
