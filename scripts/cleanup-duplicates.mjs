import mysql from "mysql2/promise";

const connection = await mysql.createConnection(process.env.DATABASE_URL);

async function analyzeDuplicates() {
  console.log("🔍 Analyzing database for duplicates...\n");
  
  // Get total counts
  const [totalRows] = await connection.execute(`
    SELECT 
      COUNT(*) as total_tools,
      COUNT(DISTINCT name) as unique_tools
    FROM tools
  `);
  
  const { total_tools, unique_tools } = totalRows[0];
  const duplicate_count = total_tools - unique_tools;
  
  console.log(`📊 Database Statistics:`);
  console.log(`   Total tools: ${total_tools}`);
  console.log(`   Unique tools: ${unique_tools}`);
  console.log(`   Duplicate entries: ${duplicate_count}\n`);
  
  // Get list of duplicates
  const [duplicates] = await connection.execute(`
    SELECT name, COUNT(*) as count, GROUP_CONCAT(id ORDER BY id) as ids
    FROM tools
    GROUP BY name
    HAVING COUNT(*) > 1
    ORDER BY count DESC
    LIMIT 20
  `);
  
  if (duplicates.length > 0) {
    console.log(`🔍 Top 20 Duplicates:`);
    duplicates.forEach((dup, index) => {
      console.log(`   ${index + 1}. "${dup.name}" - ${dup.count} copies (IDs: ${dup.ids})`);
    });
  }
  
  return { total_tools, unique_tools, duplicate_count };
}

async function removeDuplicates() {
  console.log("\n🧹 Starting duplicate removal process...\n");
  
  // Get all duplicate groups
  const [duplicateGroups] = await connection.execute(`
    SELECT name, GROUP_CONCAT(id ORDER BY id) as ids
    FROM tools
    GROUP BY name
    HAVING COUNT(*) > 1
  `);
  
  let removed = 0;
  
  for (const group of duplicateGroups) {
    const ids = group.ids.split(',').map(Number);
    const keepId = ids[0]; // Keep the first (oldest) entry
    const removeIds = ids.slice(1); // Remove the rest
    
    if (removeIds.length > 0) {
      const placeholders = removeIds.map(() => '?').join(',');
      await connection.execute(`DELETE FROM tools WHERE id IN (${placeholders})`, removeIds);
      removed += removeIds.length;
      console.log(`   ✓ Removed ${removeIds.length} duplicate(s) of "${group.name}" (kept ID: ${keepId})`);
    }
  }
  
  console.log(`\n✅ Cleanup complete! Removed ${removed} duplicate entries.\n`);
  
  // Verify final counts
  const [finalResult] = await connection.execute(`SELECT COUNT(*) as final_count FROM tools`);
  console.log(`📊 Final tool count: ${finalResult[0].final_count}`);
}

// Run analysis first
const stats = await analyzeDuplicates();

if (stats.duplicate_count > 0) {
  console.log(`\n⚠️  Found ${stats.duplicate_count} duplicates. Proceeding with cleanup...`);
  await removeDuplicates();
} else {
  console.log("\n✅ No duplicates found! Database is clean.");
}

await connection.end();
process.exit(0);
