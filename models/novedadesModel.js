var pool = require('./../models/bd');

// Función para obtener novedades
async function getNovedades() {
  try {
    var query = 'SELECT id, Titulo, `Valor-USD`, Consulta FROM novedades_web';
    var rows = await pool.query(query);
    return rows;
  } catch (error) {
    throw error;
  }
}

// Función para insertar una novedad
async function insertNovedades(obj) {
  try {
    var query = "INSERT INTO novedades_web SET ?";
    var rows = await pool.query(query, [obj]);
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Función para borrar una novedad
async function deleteNovedadesMyId(id) {
  try {
    var query = 'DELETE FROM novedades_web WHERE id = ?';
    var rows = await pool.query(query, [id]);
    return rows;
  } catch (error) {
    throw error;
  }
}

// Función para obtener una novedad específica por su ID
async function getNovedadesById(id) {
  var query = 'SELECT * FROM novedades_web WHERE id = ?';
  var rows = await pool.query(query, [id]);
  return rows[0];
}

// Función para modificar (actualizar) una novedad
async function updateNovedadById(id, obj) {
  try {
    var query = 'UPDATE novedades_web SET ? WHERE id = ?';
    var rows = await pool.query(query, [obj, id]);
    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = { getNovedades, insertNovedades, deleteNovedadesMyId, getNovedadesById, updateNovedadById };
