package tr.com.dao;

import java.util.List;

import tr.com.entities.Kullanici;

public interface KullaniciDao {

    public Kullanici saveOrUpdate(Kullanici entity);

    public List<Kullanici> getAll();

    public void deleteById(Kullanici kullanici);

    public Kullanici getById(Long id);
}
