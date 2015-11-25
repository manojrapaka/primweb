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
import tr.com.entities.Prim;
import tr.com.service.PrimService;

@Controller
@RequestMapping("/prim")
public class PrimController {
	
	@Autowired
	PrimService service;

	@RequestMapping(value="/getAll.ajax")
	@ResponseBody
	public void getAll(HttpServletRequest request, HttpServletResponse response) throws IOException{
		
		JSONObject obj = new JSONObject();
		JSONObject user = new JSONObject();
		JSONArray userList = new JSONArray();
		
		List<Prim> primList = service.getAll();
		
		for (Prim prim : primList) {
			user.put("primId", prim.getId());
			user.put("adi", prim.getAdi());
			user.put("yuzde", prim.getYuzde());
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
		Prim prim = new Prim();
		Long primId = jdata.getLong("primId");
		
		
		prim.setAdi(jdata.getString("adi"));
		prim.setYuzde(jdata.getDouble("yuzde"));
		if(primId != null && primId != 0L){
			prim.setId(primId);
		}
		
		service.saveOrUpdate(prim);
		
		user.put("adi", jdata.get("adi"));
		user.put("yuzde", jdata.get("yuzde"));
		
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
		Prim prim = new Prim();
		Long primId = jdata.getLong("primId");
		
		if(primId != null && primId != 0L){
			prim.setId(primId);
		}
		
		service.deleteById(prim);

		obj.put("success", true);
		
		response.getWriter().write(obj.toString());
		
	}
}
