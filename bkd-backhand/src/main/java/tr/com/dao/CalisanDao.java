package tr.com.dao;

import java.util.List;

import tr.com.entities.Calisan;

public interface CalisanDao {

    public Calisan saveOrUpdate(Calisan entity);

    public List<Calisan> getAll();

    public void deleteById(Calisan calisan);

    public Calisan getById(Long id);
}
