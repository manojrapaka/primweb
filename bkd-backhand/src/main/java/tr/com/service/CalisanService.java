package tr.com.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import tr.com.dao.CalisanDao;

import tr.com.entities.Calisan;

@Service
@EnableTransactionManagement
public class CalisanService {

    @Autowired
    private CalisanDao calisanDao;

    public void saveOrUpdate(Calisan calisan) {
        calisanDao.saveOrUpdate(calisan);
    }

    public List<Calisan> getAll() {
        return calisanDao.getAll();
    }

    public void deleteById(Calisan calisan) {
        calisanDao.deleteById(calisan);
    }

    public Calisan getById(Long calisanId) {
        return calisanDao.getById(calisanId);
    }
}
