package tr.com.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import tr.com.dao.GrupDao;
import tr.com.entities.Grup;

@Service
@EnableTransactionManagement
public class GrupService {

    @Autowired
    private GrupDao grupDao;

    public void saveOrUpdate(Grup grup) {
        grupDao.saveOrUpdate(grup);
    }

    public List<Grup> getAll() {
        return grupDao.getAll();
    }

    public void deleteById(Grup grup) {
        grupDao.deleteById(grup);
    }

    public Grup getById(Long grupId) {
        return grupDao.getById(grupId);
    }
}
