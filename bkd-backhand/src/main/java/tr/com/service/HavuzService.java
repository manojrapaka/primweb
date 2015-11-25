package tr.com.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import tr.com.dao.HavuzDao;

import tr.com.entities.Havuz;

@Service
@EnableTransactionManagement
public class HavuzService {

    @Autowired
    private HavuzDao havuzDao;

    public void saveOrUpdate(Havuz havuz) {
        havuzDao.saveOrUpdate(havuz);
    }

    public List<Havuz> getAll() {
        return havuzDao.getAll();
    }

    public void deleteById(Havuz havuz) {
        havuzDao.deleteById(havuz);
    }

    public Havuz getById(Long havuzId) {
        return havuzDao.getById(havuzId);
    }
}
