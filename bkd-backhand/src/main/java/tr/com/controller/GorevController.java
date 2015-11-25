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
import tr.com.entities.Gorev;
import tr.com.entities.Prim;
import tr.com.service.GorevService;
import tr.com.service.PrimService;

@Controller
@RequestMapping("/gorev")
public class GorevController {

    @Autowired
    GorevService service;

    @Autowired
    PrimService primService;

    @RequestMapping(value = "/getAll.ajax")
    @ResponseBody
    public void getAll(HttpServletRequest request, HttpServletResponse response) throws IOException {

        JSONObject obj = new JSONObject();
        JSONObject user = new JSONObject();
        JSONArray userList = new JSONArray();

        List<Gorev> gorevList = service.getAll();

        for (Gorev gorev : gorevList) {
            user.put("gorevId", gorev.getId());
            user.put("adi", gorev.getAdi());
            user.put("prim", gorev.getPrim());
            userList.add(user);
        }

        obj.put("data", userList);
        obj.put("success", true);

        response.getWriter().write(obj.toString());

    }

    @RequestMapping(value = "/saveOrUpdate.ajax")
    @ResponseBody
    public void saveOrUpdate(HttpServletRequest request, HttpServletResponse response) throws IOException {

        JSONObject obj = new JSONObject();
        JSONObject user = new JSONObject();
        JSONArray userArr = new JSONArray();

        String data = request.getParameter("data");
        JSONObject jdata = JSONObject.fromObject(data);
        Gorev gorev = new Gorev();
        Long gorevId = jdata.getLong("gorevId");

        Prim prim = new Prim();
        prim = primService.getById((Long) jdata.getLong("primId"));

        gorev.setAdi(jdata.getString("adi"));
        gorev.setPrim(prim);
        if (gorevId != null && gorevId != 0L) {
            gorev.setId(gorevId);
        }

        service.saveOrUpdate(gorev);

        user.put("adi", jdata.get("adi"));
        user.put("prim", jdata.get("prim"));

        userArr.add(user);

        obj.put("data", userArr);
        obj.put("success", true);

        response.getWriter().write(obj.toString());

    }

    @RequestMapping(value = "/deleteById.ajax")
    @ResponseBody
    public void deleteById(HttpServletRequest request, HttpServletResponse response) throws IOException {

        JSONObject obj = new JSONObject();

        JSONObject jdata = JSONObject.fromObject(request.getParameter("data"));
        Gorev gorev = new Gorev();
        Long primId = jdata.getLong("gorevId");

        if (primId != null && primId != 0L) {
            gorev.setId(primId);
        }

        
        service.deleteById(gorev);

        obj.put("success", true);

        response.getWriter().write(obj.toString());

    }
}
