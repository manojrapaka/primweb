package tr.com.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import tr.com.dao.SatisDao;
import tr.com.entities.Satis;

@Service
@EnableTransactionManagement
public class SatisService {

    @Autowired
    private SatisDao satisDao;

    public void saveOrUpdate(Satis satis) {
        satisDao.saveOrUpdate(satis);
    }

    public List<Satis> getAll() {
        return satisDao.getAll();
    }

    public void deleteById(Satis satis) {
        satisDao.deleteById(satis);
    }

    public Satis getById(Long satisId) {
        return satisDao.getById(satisId);
    }
}
