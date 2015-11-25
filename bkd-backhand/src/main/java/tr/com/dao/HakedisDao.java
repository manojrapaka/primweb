package tr.com.dao;

import java.util.List;

import tr.com.entities.Hakedis;

public interface HakedisDao {

    public Hakedis saveOrUpdate(Hakedis entity);

    public List<Hakedis> getAll();

    public void deleteById(Hakedis prim);

    public Hakedis getById(Long id);
}
