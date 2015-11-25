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
@RequestMapping("/login")
public class LoginController {

	
	@Autowired
	private KullaniciService kullaniciservice;
	
	@RequestMapping(value="/userLogin.ajax")
	@ResponseBody
	public void userLogin(HttpServletRequest request, HttpServletResponse response) throws IOException{
		Kullanici kullanici = new Kullanici();
		
		JSONObject prsn = new JSONObject();
		JSONArray data = new JSONArray();
		JSONObject result = new JSONObject();
		
		kullanici.setName(request.getParameter("name"));
		kullanici.setPassword(request.getParameter("password"));
		
		try {
			kullaniciservice.saveOrUpdate(kullanici);
			List<Kullanici> kullaniciList = kullaniciservice.getAll();
			
			for (Kullanici kullan : kullaniciList) {
				prsn = new JSONObject();
				prsn.put("id", kullan.getId());
				prsn.put("name", kullan.getName());
				prsn.put("email", kullan.getPassword());
				data.add(prsn);
			}
			
			result.put("success", true);
			result.put("data", data);
		} catch (Exception e) {
			result.put("success", false);
			result.put("error", e.getMessage());
			result.put("data", data);
		}
		
		response.getWriter().write(result.toString());
		
	}
	
}
