package tr.com.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import tr.com.dao.HakedisDao;

import tr.com.entities.Hakedis;

@Service
@EnableTransactionManagement
public class HakedisService {

    @Autowired
    private HakedisDao hakedisDao;

    public void saveOrUpdate(Hakedis hakedis) {
        hakedisDao.saveOrUpdate(hakedis);
    }

    public List<Hakedis> getAll() {
        return hakedisDao.getAll();
    }

    public void deleteById(Hakedis hakedis) {
        hakedisDao.deleteById(hakedis);
    }

    public Hakedis getById(Long hakedisId) {
        return hakedisDao.getById(hakedisId);
    }
}
