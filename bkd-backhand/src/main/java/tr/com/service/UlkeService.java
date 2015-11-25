package tr.com.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import tr.com.dao.UlkeDao;
import tr.com.entities.Ulke;

@Service
@EnableTransactionManagement
public class UlkeService {

    @Autowired
    private UlkeDao ulkeDao;

    public void saveOrUpdate(Ulke ulke) {
        ulkeDao.saveOrUpdate(ulke);
    }

    public List<Ulke> getAll() {
        return ulkeDao.getAll();
    }

    public void deleteById(Ulke ulke) {
        ulkeDao.deleteById(ulke);
    }

    public Ulke getById(Long ulkeId) {
        return ulkeDao.getById(ulkeId);
    }
}
