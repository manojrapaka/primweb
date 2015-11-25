package tr.com.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import tr.com.dao.KullaniciDao;
import tr.com.entities.Kullanici;

@Service
@EnableTransactionManagement
public class KullaniciService {

    @Autowired
    private KullaniciDao kullaniciDao;

    public void saveOrUpdate(Kullanici kullanici) {
        kullaniciDao.saveOrUpdate(kullanici);
    }

    public List<Kullanici> getAll() {
        return kullaniciDao.getAll();
    }

    public void deleteById(Kullanici kullanici) {
        kullaniciDao.deleteById(kullanici);
    }

    public Kullanici getById(Long kullaniciId) {
        return kullaniciDao.getById(kullaniciId);
    }
}
