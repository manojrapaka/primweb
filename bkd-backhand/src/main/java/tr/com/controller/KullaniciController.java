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
import tr.com.entities.Kullanici;
import tr.com.service.KullaniciService;

@Controller
@RequestMapping("/kullanici")
public class KullaniciController {
	
	@Autowired
	KullaniciService service;

	@RequestMapping(value="/getAll.ajax")
	@ResponseBody
	public void getAll(HttpServletRequest request, HttpServletResponse response) throws IOException{
		
		JSONObject obj = new JSONObject();
		JSONObject user = new JSONObject();
		JSONArray userList = new JSONArray();
		
		List<Kullanici> kullaniciList = service.getAll();
		
		for (Kullanici kullanici : kullaniciList) {
			user.put("kullaniciId", kullanici.getId());
			user.put("adi", kullanici.getName());
			user.put("gorev", kullanici.getPassword());
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
		Kullanici kullanici = new Kullanici();
		Long kullaniciId = jdata.getLong("kullaniciId");
		
		kullanici.setName(jdata.getString("adi"));
		kullanici.setPassword(jdata.getString("password"));
		if(kullaniciId != null && kullaniciId != 0L){
			kullanici.setId(kullaniciId);
		}
		
		service.saveOrUpdate(kullanici);
		
		user.put("adi", jdata.get("adi"));
		user.put("gorev", jdata.get("gorev"));
		
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
		Kullanici kullanici = new Kullanici();
		Long kullaniciId = jdata.getLong("kullaniciId");
		
		if(kullaniciId != null && kullaniciId != 0L){
			kullanici.setId(kullaniciId);
		}
		
		service.deleteById(kullanici);

		obj.put("success", true);
		
		response.getWriter().write(obj.toString());
		
	}
}
