package tr.com.dao;

import java.util.List;

import tr.com.entities.Prim;

public interface PrimDao {

    public Prim saveOrUpdate(Prim entity);

    public List<Prim> getAll();

    public void deleteById(Prim prim);

    public Prim getById(Long primId);
}
