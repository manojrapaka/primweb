package tr.com.dao;

import java.util.List;

import tr.com.entities.Satis;

public interface SatisDao {

    public Satis saveOrUpdate(Satis entity);

    public List<Satis> getAll();

    public void deleteById(Satis prim);

    public Satis getById(Long id);
}
